const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categories: [{ type: String }], // e.g., ["Tech", "Lifestyle"]
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
