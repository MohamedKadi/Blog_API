const { checkSchema } = require('express-validator');

const userValidationSchema = checkSchema({
  username: {
    trim: true,
    isString: true,
    notEmpty: true,
    errorMessage: 'Username must be a non-empty string',
  },
  email: {
    trim: true,
    isEmail: true,
    errorMessage: 'Invalid email address',
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password must be at least 8 characters long',
    },
  },
});

module.exports = userValidationSchema;
