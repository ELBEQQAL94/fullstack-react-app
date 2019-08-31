// models
const Post = require('../models/post');

// package for upload files (images, vidoes..)
const formidable = require('formidable');

// access to file system
const fs = require('fs');

// lodash
const _ = require('lodash');


// Gel all posts
exports.getPosts = (req, res) => {
    const posts = Post.find()
    .populate("postedBy", "_id firstname lastname")
    .select("title body")
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
exports.createPost = async (req, res) => {
   
    // parse a file upload
    const form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (error, fields, files) => {

        if(error){
            res.status(400).json({
                message: "Image could not be uploaded"
            });
        };

        let post = new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;

        post.postedBy = req.profile;

        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        // save post
        post.save((error, result) => {

            if(error){
                res.status(400).json(error);
            };

            res.status(200).json(result);

        });

    });

    /*const postExiste = await Post.findOne({ id: req.body._id});

    // check if user existe
    if(postExiste){
        return res.status(403).json({
            error: "Post already existe"
        });

    };*/

    const post = await new Post(req.body);

    post.save()
    .then(result => {
        res.status(200).json({
            message: "Post created successfully!"
        });
    });

};


// get all posts by user
exports.getAllPostsByUser = (req, res) => {

    // find all posts by user id
    post.find({postedBy: req.profile._id})
        .populate("postedBy", "_id firstname lastname")
        .sort("_created")
        .exec((error, posts) => {

            if(error){
                return res.status(400).json(error);
            }

            res.status(200).json(posts);

        });

};


// get post by id
exports.postById = (req, res, next, id) => {
    Post.findById({_id: id})
        .populate("postedBy", "_id firstname lastname")
        .exec((error, post) => {

            if(error || !post){
                return res.status(400).json(error);
            }

            req.post = post;

            next();

        });

};

// update post
exports.updatePost = (req, res) => {

    let post = req.post;

    // mutate post object using lodash function
    _.extend(post, req.body);

    post.updated = Date.now();

    // save new changes to database
    post.save((error) => {

        if(error){
            return res.status(400).json({
                message: "You are not authorized to perform this action"
            });
        };

        res.status(200).json({
            message: "Post updated successfully!"
        });

    });

};

// check if user has access to delete post
exports.isPoster = (req, res, next) => {

    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;

    if(!isPoster) {
        res.status(400).json({
            message: "User no authorized"
        });

    };

    next();    

};

// delete post
exports.deletePost = (req, res) => {

    let post = req.post;

    post.remove((error) => {
        if(error){
            res.status(400).json({
                Error: error
            });
        };

        res.status(200).json({
            message: "Post deleted successfully!"
        });

    });

};