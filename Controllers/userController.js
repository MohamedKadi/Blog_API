const { isValidObjectId } = require('mongoose');
const User = require('../Models/User');
const cloudinary = require('../utils/cloudinary');

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
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid ID format',
      });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    res.status(204).json({
      status: 'success',
      message: 'User deleted successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please upload a file',
      });
    }
    const user = await User.findById(req.user.id);
    if (user.profilePic) {
      // Delete existing profile picture
      await cloudinary.uploader.destroy(user.profilePic);
    }
    // Use promise-based upload instead of callback
    const result = await cloudinary.uploader.upload(req.file.path);

    user.profilePic = result.public_id;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Profile picture uploaded successfully',
      data: {
        profilePic: result.secure_url,
      },
    });
  } catch (err) {
    next(err);
  }
};
