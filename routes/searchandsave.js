var request = require('request')
var fs = require('fs')
var express = require('express')
var router = express.Router();

var dbSaveImages = require('..//models/saveImages')

var Scraper = require('images-scraper'),
    google = new Scraper.Google();
//New comment    git status
/**
 * API for sending the requeust to google and saving the image on local drive 
 * and then saving the file path on the mongodb. 
 */

router.route('/query').post(function(req, res) {
    if (req.body.query && req.body.count) {

        var queryString = req.body.query.toLowerCase()
        var count = parseInt(req.body.count)

        //Logic for sending th erequurest and saving the files  on local disk .

        google.list({ keyword: queryString, num: count, detail: true, nightmare: { show: true } })
            .then(function(queryres) {
                if (!fs.existsSync(queryString)) {
                    fs.mkdirSync(queryString)
                    var dbImage = new dbSaveImages({
                        keyword: queryString
                    })
                    dbImage.save(function(err, data) {
                        if (err) {
                            res.json({
                                status: false,
                                msg: 'Database error'
                            })
                        } else {
                            console.log(queryres)
                            var urlarr = []
                            for (var i = 0; i < queryres.length; i++) {
                                console.log("In loop")

                                request(queryres[i].url).pipe(fs.createWriteStream('./' + queryString + '/' + queryString + i + '.png'))
                                console.log("File saved")
                                var urlString = './' + queryString + '/' + queryString + i + '.png';
                                urlarr.push(urlString)
                                console.log(urlarr)
                            }
                            dbSaveImages.findByIdAndUpdate({
                                _id: data._id
                            }, {
                                $set: { 'imagepath': urlarr }
                            }, function(err, resData) {
                                if (err) {
                                    res.json({
                                        status: false,
                                        msg: 'Databse error'

                                    })
                                } else {
                                    console.log(resData)
                                    res.json({
                                        status: true,
                                        msg: 'Data saved'
                                    })
                                }
                            })

                        }
                    })


                } else {
                    res.json({
                        status: false,
                        msg: 'Query String already stored'
                    })
                }



            })
            .catch(function(err) { console.log('err', err); });
    } else {
        res.json({
            status: false,
            msg: 'Data not sent'
        })
    }
})



module.exports = router;