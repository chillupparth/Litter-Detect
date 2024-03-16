const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ImageSchema = new Schema({
    url: String,
    filename: String
})

const GroupSchema = new Schema({
    name: String,
    pinCode: Number,
    images: [ImageSchema]
})

module.exports.Group = mongoose.model("Group", GroupSchema)
