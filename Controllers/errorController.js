module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    err.statusCode = 400;
    err.status = 'fail';
    err.message = `Duplicate field value: ${Object.keys(err.keyValue).join(
      ', '
    )}. Please use another value`;
  } // handle duplicate key error

  res.status(err.statusCode || 500).json({
    status: err.status || 'something went wrong',
    message: err.message,
    stack: err.stack,
  });
};
