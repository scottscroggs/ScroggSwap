//Importing our code from the Controller file.
const CommentController = require('../controllers/comment.controller');

module.exports = (app) => {
    app.post('/api/comment', CommentController.createComment); //POST request to create a new record
    app.get('/api/comment', CommentController.findAllComments); //GET request to retrieve all records
    app.get('/api/comment/:coin', CommentController.findCommentsByCoin); //GET request to retrieve records by coin 
    app.get('/api/comment/:id', CommentController.getComment); //GET request to retrieve a single record
    app.put('/api/comment/:id', CommentController.updateComment); //PUT request to update a single record
    app.delete('/api/comment/:id', CommentController.deleteComment); //DELETE request to delete a single record

}