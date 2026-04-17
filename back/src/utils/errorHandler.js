
export const handleError = (error, req, res, next) => {
    console.error(error)

    const statusCode = error.statusCode || error.status || 500
    const message = error.message || "Internal server error"

    res.status(statusCode).json({
        message: message,
    })
}