const ErrorHandler = require ("../utils/errorhandler").default;
module.exports =(err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

   // Wrong Mongodb Id error
   if(err.name === "CastError"){
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler( 400, message);
   };


   // Mongoose dupilcate key error
   if(err.code === 11000){
    const message =`Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler( 400, message);
   };

   
   // Wrong JWT error
   if(err.name === "JsonWebTokenError"){
    const message = `Json Web Token is invalid, Try again`;
    err = new ErrorHandler(  400, message);
   };
    
    // JWT Expire error
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is Expired, Try again`;
        err = new ErrorHandler( 404, message );
       };

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
