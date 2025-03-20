const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  /*destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Files will be stored in uploads directory
  },*/
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Create multer instance with configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

module.exports = upload;
