var request = require('request')
var fs = require('fs')
var query = req.body.query
var Scraper = require('images-scraper'),
    google = new Scraper.Google();
//New comment    git status

google.list({ keyword: query, num: 15, detail: true, nightmare: { show: false } })
    .then(function(res) {


        if (!fs.existsSync(query)) {
            fs.mkdirSync(query)
        }

        for (var i = 0; i < res.length; i++) {

            request(res[i].url).pipe(fs.createWriteStream(__dirname + '/' + query + '/' + query + i + '.png'))
        }

    })
    .catch(function(err) { console.log('err', err); });