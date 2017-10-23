var mongoose = require('mongoose')

var imageSchema = mongoose.Schema({
    keyword: { type: String },
    imagepath: [{ type: String }]
});

module.exports = mongoose.model('imageSchema', imageSchema)