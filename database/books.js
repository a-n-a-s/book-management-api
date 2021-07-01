const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
        ISBN : String,
        title : String,
        author : [Number],
        language : String,
        pubDate : String,
        numPage : Number,
        category : [String],
        publication : Number
})
const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;