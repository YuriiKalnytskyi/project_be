module.exports = class ErrorHandler extends Error {
  constructor(status, message = '', customCode) {
    super(message);
    this.status = status;
    this.message = message;
    this.customCode = customCode;

    Error.captureStackTrace(this, this.constructor);
  }
};
