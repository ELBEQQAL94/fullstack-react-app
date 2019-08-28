
exports.createPostValidator = (req, res, next) => {
   
    // check validation title of post
    req.check("title", "Title is required").notEmpty();

    req.check("title", "Title must be between 4 and 150 characters")
    .isLength({ min: 4, max: 150 });


    // check validation body of post
    req.check("body", "Body is required").notEmpty();

    req.check("body", "Body must be between 4 and 2000 characters")
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