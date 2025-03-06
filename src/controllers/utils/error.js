const errorHandler = (res, error, code, message) => {
  console.error(message, error);
  res.status(code).json({
    success: false,
    message,
    error: error.message,
  });
};

export default errorHandler;
