const _ = require('lodash');
const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const PostNotification = mongoose.model('PostNotification');

module.exports = {
  async create(req, res, next) {
    try {
      const { id: postId } = req.params;
      const { content } = req.body;

      if (!postId) {
        return res.status(400).json({ error: 'Parameter is missing' });
      }

      if (!content.length) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(400).json({ error: "Post doesn't exist" });
      }

      const userPostAuthor = await User.findById(post.author);

      if (userPostAuthor.id !== req.userId && userPostAuthor.friends.indexOf(req.userId) === -1) {
        return res.status(400).json({ error: "You can't comment on this post" });
      }

      const comment = await Comment.create({ content, author: req.userId, post: postId });

      post.comments.push(comment.id);
      await post.save();

      await PostNotification.create({
        post: post.id,
        from: req.userId,
        to: userPostAuthor.id,
        topic: 'comment',
      });

      return res.status(201).json(comment);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: 'Parameter is missing' });
      }

      const { content } = req.body;

      if (!content.length) {
        return res.status(400).json({ error: 'You must send a content to update' });
      }

      const comment = await Comment.findById(req.params.id);

      if (!comment) {
        return res.status(400).json({ error: "Comment doesn't exist" });
      }

      if (String(comment.author) !== String(req.userId)) {
        return res.status(400).json({ error: 'You can not to update this comment' });
      }

      const newComment = await Comment.findByIdAndUpdate(req.params.id, { content }, { new: true });

      return res.json(newComment);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: 'Parameter is missing' });
      }

      const comment = await Comment.findById(req.params.id);

      if (!comment) {
        return res.status(400).json({ error: "Comment doesn't exist" });
      }

      const post = await Post.findById(comment.post);

      if (
        String(comment.author) === String(req.userId) ||
        String(post.author) === String(req.userId)
      ) {
        post.comments.splice(post.comments.indexOf(comment.id), 1);
        await post.save();
        await comment.remove();

        return res.json();
      }

      return res.status(400).json({ error: 'You can not delete this comment' });
    } catch (err) {
      return next(err);
    }
  },

  async feedByPost(req, res, next) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: 'Parameter is missing' });
      }

      const postComments = await Post.findById(req.params.id)
        .select('comments')
        .populate({
          path: 'comments',
          options: {
            limit: 50,
          },
          populate: {
            path: 'author',
            select: ['name', 'avatar_url'],
          },
        });

      const comments = _.orderBy(postComments.comments, 'createdAt', 'desc');

      return res.json(comments);
    } catch (err) {
      return next(err);
    }
  },

  async search(req, res, next) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: 'Parameter is missing' });
      }

      const comment = await Comment.findById(req.params.id).populate({
        path: 'author',
        select: ['name', 'avatar_url'],
      });

      return res.json(comment);
    } catch (err) {
      return next(err);
    }
  },

  async toggleLike(req, res, next) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: 'Parameter is missing' });
      }

      const comment = await Comment.findById(req.params.id);

      if (!comment) {
        return res.status(400).json({ error: "Comment doesn't exist" });
      }

      const like = comment.likes.indexOf(req.userId);

      if (like !== -1) {
        comment.likes.splice(like, 1);
        await comment.save();

        return res.json();
      }

      comment.likes.push(req.userId);
      await comment.save();

      return res.json();
    } catch (err) {
      return next(err);
    }
  },
};
