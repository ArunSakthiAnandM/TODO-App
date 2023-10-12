class AppError extends Error {
  constructor(message, statusCode, res) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    res.status(statusCode).render("error.pug", {
      errorMessage: message,
    });
  }
}

module.exports = AppError;
