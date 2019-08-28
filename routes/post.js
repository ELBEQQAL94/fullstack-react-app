const express = require('express');

// router functions
const { getPosts, createPost } = require('../controllers/post');

// validator functions
const {createPostValidator} = require('../validator');

const router = express.Router();

// Our routers
router.get('/', getPosts);

router.post('/post' ,createPostValidator, createPost);

module.exports = router;