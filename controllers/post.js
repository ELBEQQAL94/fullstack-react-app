// models
const Post = require('../models/post');


// Gel all posts
exports.getPosts = (req, res) => {
    const posts = Post.find()
    .select("_id title body")
    .then(posts => {
        res.status(200).json({
            posts
        });
    })
    .catch(error => {
        res.status(400).json({
            Error: error.message
        });
    });
};


// Create post
exports.createPost = (req, res) => {
    const post = new Post(req.body);

    post.save()
    .then(result => {
        res.status(200).json({
            post: result
        });
    });

};