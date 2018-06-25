const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const PostNotification = mongoose.model('PostNotification');

module.exports = (io) => {
  io.use(async (socket, next) => {
    const { token } = socket.handshake.query;

    if (!token) {
      return null;
    }

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      socket.client.userId = decoded._id;

      return next();
    } catch (err) {
      return next(err);
    }
  });

  io.on('connection', (socket) => {
    if (socket.client.userId) {
      Post.watch().on('change', async (data) => {
        if (data.operationType === 'delete') {
          socket.emit('posts.delete', data.documentKey);
          return;
        }

        let type = data.operationType;
        const post = await Post.findById(data.documentKey);

        if (type === 'update' || type === 'replace') {
          type = 'edit';
        }

        if (String(post.author._id) === socket.client.userId) {
          socket.emit(`posts.${type}`, data.documentKey);
          return;
        }

        const me = await User.findById(socket.client.userId);

        if (me.isFriend(post.author._id)) {
          socket.emit(`posts.${type}`, data.documentKey);
        }

        await Post.watch().close();
      });

      PostNotification.watch().on('change', async (data) => {
        if (data.operationType === 'delete') return;
        if (String(data.fullDocument.to) !== socket.client.userId) return;

        if (data.operationType === 'insert') {
          socket.emit('post.notification.insert', data.documentKey);
        }

        await PostNotification.watch().close();
      });

      Comment.watch().on('change', async (data) => {
        if (data.operationType === 'insert') {
          socket.emit(`comment.${data.operationType}.${data.fullDocument.post}`, {
            id: data.documentKey._id,
            postId: data.fullDocument.post,
          });
        }

        await Comment.watch().close();
      });

      User.watch().on('change', async (data) => {
        if (
          (data.operationType === 'update' || data.operationType === 'replace') &&
          String(data.documentKey._id) === socket.client.userId
        ) {
          socket.emit('user.edit', data.documentKey._id);
        }

        await User.watch().close();
      });
    }
  });
};
