// ErrorHandler.js

const error = require("../middleware/error");

class ErrorHandler extends Error{
    constructor(statusCode, message) {
        super(message);  // Call the constructor of the parent class
        this.statusCode = statusCode;
        this.message = message;
    

        Error.captureStackTrace(this, this.constructor);
    }
}   

module.exports = ErrorHandler;
