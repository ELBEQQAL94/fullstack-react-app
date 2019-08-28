const { Schema, model } = require('mongoose');

// post schema
const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

const Post = model('Post', postSchema);

module.exports = Post;