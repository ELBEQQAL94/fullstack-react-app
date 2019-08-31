// validate post data
exports.createPostValidator = (req, res, next) => {
   
    // check validation title of post
    req.check("title", "Title is required").notEmpty();

    req.check("title", "Title must be between 4 to 150 characters")
    .isLength({ min: 4, max: 150 });


    // check validation body of post
    req.check("body", "Body is required").notEmpty();

    req.check("body", "Body must be between 4 to 2000 characters")
    .isLength({ min: 4, max: 2000 });

    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            Error: firstError
        });
    };

    next();

}

// validate user data
exports.userSignupValidator = (req, res, next) => {

    // check first name
    req.check("firstname", "firstname is required").notEmpty();

    // check length of first name
    req.check("firstname", "firstname must be between 4 to 20 characters")
    .isLength({
        min: 4,
        max: 20
    });


    // check last name
    req.check("lastname", "lastname is required").notEmpty();

    // check length of first name
    req.check("lastname", "lastname must be between 4 to 20 characters")
    .isLength({
        min: 4,
        max: 20
    });


    // check email
    req.check("email", "email is required").notEmpty();
    
    req.check("email", "email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must be contain @")
    .isLength({
        min: 3,
        max: 32
    });


    // check password
    req.check("password", "password is required").notEmpty();

    req.check("password")
    .isLength({min: 6})
    .withMessage("Pssword must contain 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");

    // hundle error

    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            Error: firstError
        });
    };

    next();

};