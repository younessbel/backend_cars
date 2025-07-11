function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler; 