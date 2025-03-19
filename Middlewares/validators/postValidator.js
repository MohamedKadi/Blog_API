const { checkSchema } = require('express-validator');

const postValidationSchema = checkSchema({
  title: {
    trim: true,
    isString: true,
    notEmpty: true,
    errorMessage: 'Title must be a non-empty string',
  },
  content: {
    trim: true,
    isString: true,
    notEmpty: true,
    errorMessage: 'Content must be a non-empty string',
  },
  categories: {
    optional: true,
    isArray: true,
    errorMessage: 'Categories must be an array',
  },
});

module.exports = postValidationSchema;
