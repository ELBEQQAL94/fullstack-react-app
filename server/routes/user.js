const express = require('express');


const { 
       userById, 
       users, 
       getUser, 
       updateUser,
       deleteUser,
       userPhoto,
       addFollowerUser,
       addFollowingUser,
       removeFollowingUser,
       removeFollowerUser
    } = require('../controllers/user');


// Protect get users router
const { requireSignin } = require('../controllers/authentication');


const router = express.Router();


// update followers 
router.put('/users/follow', requireSignin, addFollowingUser, addFollowerUser);


router.put('/users/unfollow', requireSignin, removeFollowerUser, removeFollowingUser);


// get all users
router.get('/users', users);

// get single user
router.get('/users/:userId', requireSignin, getUser);

// update user
router.put('/users/:userId', requireSignin, updateUser);

// delete user
router.delete('/users/:userId', requireSignin, deleteUser);

// get photo
router.get('/users/photo/:userId', userPhoto);


// hundle user id route
router.param("userId", userById);

module.exports = router;