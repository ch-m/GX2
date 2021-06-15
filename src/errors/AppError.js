class AppError {
  constructor(message, statusCode = 400) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default AppError;
