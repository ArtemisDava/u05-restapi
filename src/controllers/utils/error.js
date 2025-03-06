const errorHandler = (res, code, message) => {
  console.error(message);
  res.status(code).json({
    success: false,
    error: message
  });
};

export default errorHandler;
