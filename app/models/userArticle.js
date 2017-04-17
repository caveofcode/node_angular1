const mongoose = require('mongoose');

const userArticleSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('UserArticle', userArticleSchema);
