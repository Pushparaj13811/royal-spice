import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    // If error is not an instance of ApiError, convert it
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, error?.errors || [], error?.stack);
    }

    const response = {
        status: "error",
        message: error.message,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    };

    // Add validation errors if they exist
    if (error.errors && error.errors.length > 0) {
        response.errors = error.errors;
    }

    return res.status(error.statusCode).json(response);
};

export { errorHandler };
