module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    err.statusCode = 400;
    err.status = 'fail';
    err.message = err.message;
  } // handle validation error
  if (err.name === 'JsonWebTokenError') {
    err.statusCode = 400;
    err.status = 'fail';
    err.message = 'Invalid token. Please log in again!';
  } // handle invalid token error

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
