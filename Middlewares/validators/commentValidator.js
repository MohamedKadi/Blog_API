const { checkSchema } = require('express-validator');

const commentValidationSchema = checkSchema({
  text: {
    trim: true,
    isString: true,
    notEmpty: true,
    errorMessage: 'Text must be a non-empty string',
  },
});

module.exports = commentValidationSchema;
