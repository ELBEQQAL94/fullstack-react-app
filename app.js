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

// parser cookie to json format 
const cookieParser = require('cookie-parser');

// hundler error to be useful to client to understand
const expressValidator = require('express-validator');

// hundle file system
const fs = require('fs');

// to prevent cors problem when server running
const cors = require('cors');


const app = express();

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/authentication');
const userRoutes = require('./routes/user');

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


// ROUTES

// Post route
app.use("/", postRoutes);

// auth route
app.use("/", authRoutes);

// auth route
app.use("/", userRoutes);

// hundle authentication error
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({
          message: "Unauthorized to access to this content"
      });
    }
});

app.get('/', (req, res) => {
    fs.readFile("docs_api/api.json", (error, data) => {

        if(error) {

            return res.status(400).json(error);
        }

        let docs = JSON.parse(data);

        res.status(200).json(docs);

    });

});



// connect mongoose to database
mongoose.connect(MONGODB, {useNewUrlParser: true}, () => {
    console.log('Mongodb is connected..')
});

// hundle database error
mongoose.connection.on('error', err => console.log('DB connection error:', err.message));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`))