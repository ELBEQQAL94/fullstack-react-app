const {model, Schema } = require('mongoose');

const uuidv1 = require('uuid/v1');

const crypto = require('crypto');


// Create User Schema
const userSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: true
    },

    lastname: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        required: true
    },

    hashed_password: {
        type: String,
        required: true
    },

    salt: String

}, {timestamps: true});


// Hashed password using crypto from Nodejs APIs
userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
})
.get(function(){
    return this._password;
});

// add mothods to our schema
userSchema.methods = {
    authenticate: function(password) {
        return this.encryptPassword(password) === this.hashed_password;
    },
    encryptPassword: function(password){
        if(!password) return "";

        try {

            let hash = crypto.createHmac('sha256', this.salt)
            .update(password)
            .digest('hex');

            return hash;

        } catch(err){
            return "";
        }
    }
}

const User = model('User', userSchema);

module.exports = User;