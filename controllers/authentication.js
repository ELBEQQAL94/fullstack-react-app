// get User model
const User = require('../models/user');

const jwt = require('jsonwebtoken');


const expressJwt = require('express-jwt');

const { JWTSECRET } = require('../config');

// create user route
exports.signup = async (req,res) => {
    const userExiste = await User.findOne({ email: req.body.email});

    // check if user existe
    if(userExiste){
        return res.status(403).json({
            error: "Email already existe"
        });
    };

    // create new user
    const user = await new User(req.body);

    // save user in database
    await user.save();

    // retur user data
    res.status(200).json({
        message: "Sign Up success ! Please login!"
    });
};


// sign up user router
exports.signin = async (req, res) => {

    // find user based on email
    const { email, password } = req.body;

    User.findOne({email}, (error, user) => {


        if(error || !user){
            return res.status(401).json({
                error: "email/password Incorrect, please verify !"
            });

        }

        // if user found make sure, email and password match
        // create authetication model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "email/password Incorrect, please verify !"
            });
        }

        // generate token
        const token = jwt.sign({_id: user._id}, JWTSECRET);

        res.cookie("token", token, {expire: new Date() + 9999});


        // return response user to client

        return res.status(200).json({token, message: 
            "Sign in succefully!"
        
        });

    });

};


// create sign out route
exports.signout = (req, res) => {
    res.clearCookie('token');
    return res.json({
        message: "Sign Out Success!"
    });
};


// require signin
exports.requireSignin = expressJwt({
    secret: JWTSECRET,
    userProperty: "auth"
});