const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

// post schema
const postSchema = new Schema({

    title:{
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    photo: {
        type: Buffer,
        contentType: String 
    },

    postedBy: {
        type: ObjectId,
        ref: "User"
    },

    created: {
        type: Date,
        default: Date.now()
    }

});

const Post = model('Post', postSchema);

module.exports = Post;