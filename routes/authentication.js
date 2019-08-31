const express = require('express');

const { signup, signin, signout } = require('../controllers/authentication');


// for validate user data
const {userSignupValidator} = require('../validator');

const router = express.Router();

// Sign Up User
router.post('/signup', userSignupValidator, signup);

// Sign In User
router.post('/signin', signin);

// Sign Out User
router.get('/signout', signout);


module.exports = router;