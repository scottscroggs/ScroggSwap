const Comment = require("../models/comment.model.js")

module.exports.createComment = (request, response) => {
    //Mongoose's "create" method is run using our model to add a new record.
    Comment.create(request.body)
        .then(comment => response.json(comment))
        .catch(err => response.status(400).json(err));
}


//Method to Find All of the object.
module.exports.findAllComments = (request, response) => {
    Comment.find({})
        .then(comments => {
            console.log(comments);
            response.json(comments);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

//Method to Find All comments where the Coin matches.
module.exports.findCommentsByCoin = (request, response) => {
    Comment.find({coin:request.params.coin})
        .then(comments => {
            console.log(comments);
            response.json(comments);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}

//Method to Find One of the object
module.exports.getComment = (request, response) => {
    Comment.findOne({_id:request.params.id})
        .then(comment => response.json(comment))
        .catch(err => response.json(err))
}

//Method to Update an object
module.exports.updateComment = (request, response) => {
    Comment.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedComment => response.json(updatedComment))
        .catch(err => response.status(400).json(err));
}

//Module to Delete an object
module.exports.deleteComment= (request, response) => {
    Comment.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

