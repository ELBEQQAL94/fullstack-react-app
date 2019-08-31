const express = require('express');


const { 
       userById, 
       users, 
       getUser, 
       updateUser,
       deleteUser 
    } = require('../controllers/user');


// Protect get users router
const { requireSignin } = require('../controllers/authentication');


const router = express.Router();

// get all users
router.get('/users', requireSignin, users);

// get single user
router.get('/users/:userId', requireSignin, getUser);

// update user
router.put('/users/:userId', requireSignin, updateUser);

// delete user
router.delete('/users/:userId', requireSignin, deleteUser);

// hundle user id route
router.param("userId", userById);

module.exports = router;