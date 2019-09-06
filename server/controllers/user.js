const User = require('../models/user');

const _ = require('lodash');

// package for upload files (images, vidoes..)
const formidable = require('formidable');

// access to file system
const fs = require('fs');

// get user by id
exports.userById = (req, res, next, id) => {

    User.findById({_id: id})
        .populate('following', '_id firstname lastname')
        .populate('followers', '_id firstname lastname')
        .exec((error, user) => {

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
        
            res.status(200).json(users);
        
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
/*exports.updateUser = (req, res) => {

    let user = req.profile;

    console.log(req.body);

    // mutate user object with new request body
    user = _.extend(user, req.body);

    user.updated = Date.now();

    // save new changes to database
    user.save((error) => {
        if(error){
            res.status(400).json({
                error: "You are not authorized to perform this action"
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
*/

exports.updateUser = (req, res) => {
    let form = new formidable.IncomingForm();
    // console.log("incoming form data: ", form);

    console.log(req.body);
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save user
        let user = req.profile;
        // console.log("user in update: ", user);
        user = _.extend(user, fields);

        user.updated = Date.now();
        // console.log("USER FORM DATA UPDATE: ", user);

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            //console.log("user after update with formdata: ", user);
            res.json(user);
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


// get user photo
exports.userPhoto = (req, res, next) => {

    if(req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.contentType);
        return res.send(req.profile.photo.data)
    }

    next();
};

// update followers user

// follow unfollow
exports.addFollowingUser = (req, res, next) => {
    
    User.findByIdAndUpdate(req.body.userId, { $push: { 
        following: req.body.followId 
    } 
    }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    });
};

exports.addFollowerUser = (req, res) => {
    User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId } }, { new: true })
        .populate('following', '_id firstname lastname')
        .populate('followers', '_id firstname lastname')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};


// remove follow
exports.removeFollowerUser = (req, res, next) => {

    User.findByIdAndUpdate(req.body.userId, {
        $pull: {
            following: req.body.unfollowId
        }
    },{new: true},(error, result) => {
        if(error) {
            return res.status(400).json(error);
        }

        next();

    });
};


// remove following
exports.removeFollowingUser = (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull:{
            followers: req.body.userId
        }
    }, {new: true})
    .populate('following', '_id firstname lastname')
    .populate('followers', '_id firstname lastname')
    .exec((error, result) => {
        if(error){
            return res.status(400).json(error);
        }

        result.hashed_password = undefined;
        result.salt = undefined;

        res.json(result);

    });
};