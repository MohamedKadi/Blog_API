const { isValidObjectId } = require('mongoose');
const User = require('../Models/User');

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid ID format',
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
