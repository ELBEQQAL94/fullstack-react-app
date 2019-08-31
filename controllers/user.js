const User = require('../models/user');

const _ = require('lodash');

// get user by id
exports.userById = (req, res, next, id) => {
    User.findById({_id: id}).exec((error, user) => {

        // hundle error
        if(error || !user){
            return res.status(400).json({
                message: "User not found!"
            });
        }

        // add profile object to request with user information
        req.profile = user;

        next();

    });
};

// auth user
exports.hasAuthorization = (req, res ) => {
    
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;

    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        });
    };
};


// get all users
exports.users = (req, res) => {
    User.find()
        .select("firstname lastname email createdAt updatedAt")
        .then(users => {
        
            res.status(200).json({
                users
            });
        
    })
    .catch(error => {
        res.status(400).json({
            message: "Something went wrong!"
        });
    });
};


// get single user
exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
};


// update user
exports.updateUser = (req, res) => {
    let user = req.profile;

    // mutate user object with new request body
    user = _.extend(user, req.body);

    user.updated = Date.now();

    // save new changes to database
    user.save((error) => {
        if(error){
            res.status(400).json({
                message: "You are not authorized to perform this action"
            });
        };

        // hidden password and salt
        user.hashed_password = undefined;
        user.salt = undefined;

        res.status(200).json({ 
            message: "user data is updated successfully!"
        });
        
    });

};


// delete user
exports.deleteUser = (req, res) => {
    let user = req.profile;

    user.remove((error, user) => {
        if(error){
            res.status(400).json({
                Error: error
            });
        };

        user.hashed_password = undefined;
        user.salt = undefined;

        res.status(200).json({ 
            message: "User is deleted successfully!"
         });

    });

};