// for create Nodejs server
const express = require('express');

// for hundling header response and method we're request for
const morgan = require('morgan');

// for connecting our app to mongodb database
const mongoose = require('mongoose');

// API key to access to our database
const { MONGODB } = require('./config'); 

// parser body to json format
const bodyParser = require('body-parser');

// hundler error to be useful to client to understand
const expressValidator = require('express-validator');

const app = express();

const postRoutes = require('./routes/post');

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());

// routes
app.use("/", postRoutes);



// connect mongoose to database
mongoose.connect(MONGODB, {useNewUrlParser: true}, () => {
    console.log('Mongodb is connected..')
});

// hundle database error
mongoose.connection.on('error', err => console.log('DB connection error:', err.message));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`))