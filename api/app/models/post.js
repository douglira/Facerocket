const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  content: {
    type: String,
    maxlength: 300,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.index({ author: 1 });
PostSchema.index({ likes: 1 });
PostSchema.index({ comments: -1 });

PostSchema.statics.getFull = function (id) {
  return this.findById(id).populate({
    path: 'author',
    select: ['name', 'avatar_url'],
  });
};

mongoose.model('Post', PostSchema);
