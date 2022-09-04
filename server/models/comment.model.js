const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"]
    },

    comment: {
        type: String,
        required: [true, "A comment is required"],
        minlength: [3, "Comment must be at least 3 characters long"]
    },

    coin: {
        type: String,
    },

}, {timestamps: true});

module.exports = mongoose.model('Comment', CommentSchema);