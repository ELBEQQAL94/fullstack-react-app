const express = require('express');

// router functions
const { 
    getPosts, 
    createPost, 
    getAllPostsByUser, 
    postById,
    isPoster,
    updatePost,
    deletePost
} = require('../controllers/post');

// Protect get posts router
const { requireSignin } = require('../controllers/authentication');

const { userById } = require('../controllers/user');


// for validate post data
const {createPostValidator} = require('../validator');

const router = express.Router();

// get all posts in database
router.get('/posts', getPosts);

// create new post and send to database to save it
router.post('/post/new-post/:userId' , requireSignin, createPost, createPostValidator);


// get all posts by user id
router.get('/posts/by/:userId', getAllPostsByUser);

// update post
router.put('/posts/edit-post/:postId', requireSignin, isPoster, updatePost);

// delete post
router.delete('/post/:postId', requireSignin, isPoster, deletePost);

// hundle user id route
router.param("userId", userById);


// hundle post id route
router.param("postId", postById);


module.exports = router;