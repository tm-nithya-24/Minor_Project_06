const errorMiddleware = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Handle Invalid MongoDB ID
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid blog post ID";
    }

    // Handle MongoDB Validation Errors
    if (err.name === "ValidationError") {
        statusCode = 400;

        message = Object.values(err.errors)
            .map(error => error.message)
            .join(", ");
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorMiddleware;