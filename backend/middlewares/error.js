class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;

    }
}


export const errorMiddleware=(err, req, res, next)=>{
    err.statusCode= err.statusCode || 500;
    err.message= err.message || "Buddy, Internal Server Error";

    if(err.name === "CastError"){
        const message= `Buddy, Invalid ${err.path}`;
        err= new ErrorHandler(message, 400);
    }


    if(err.code === 11000){
        const message= `Buddy, Duplicate ${Object.keys(err.keyValue)} entered`;
        err= new ErrorHandler(message, 400);
    }

    if(err.name === "JsonWebTokenError"){
        const message= `Buddy, JSON Web Token is invalid. Try Again!!!`;
        err= new ErrorHandler(message, 400);
    }

    if(err.name === "TokenExpiredError"){
        const message= `Buddy, JSON Web Token is expired. Try Again!!!`;
        err= new ErrorHandler(message, 400);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        
    })

}

export default ErrorHandler;


