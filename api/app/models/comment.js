const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  content: {
    type: String,
    maxlength: 250,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CommentSchema.index({ author: 1 });
CommentSchema.index({ likes: 1 });
CommentSchema.index({ post: -1 });

mongoose.model('Comment', CommentSchema);
