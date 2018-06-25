const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const errorMiddleware = require('./middlewares/error');
const uploaderMiddleware = require('./middlewares/uploader');

const controllers = requireDir('./controllers');

/**
 * Auth
 */
routes.post('/signin', controllers.authController.signin);
routes.post('/signup', controllers.authController.signup);
routes.post('/forgot_pass', controllers.authController.forgotPass);
routes.post('/reset_pass', controllers.authController.resetPass);
routes.use(authMiddleware);

/**
 * User
 */
routes.get('/user/me', controllers.userController.me);
routes.put('/user/profile', uploaderMiddleware, controllers.userController.updateProfile);
routes.put('/user/password', controllers.userController.updatePassword);
routes.get('/user/profile/:id', controllers.userController.profile);
routes.get('/users', controllers.userController.search);

/**
 * Friend
 */
routes.get('/friends/request', controllers.friendController.requestList);
routes.put('/friend/:id/request/decline', controllers.friendController.decline);
routes.post('/friend/:id/request', controllers.friendController.request);
routes.delete('/friend/:id', controllers.friendController.remove);
routes.post('/friend/:id', controllers.friendController.add);
routes.get('/friends/', controllers.friendController.all);

/**
 * Post
 */
routes.post('/posts', controllers.postController.create);
routes.get('/posts', controllers.postController.feed);
routes.put('/posts/:id', controllers.postController.update);
routes.delete('/posts/:id', controllers.postController.destroy);
routes.put('/posts/:id/like', controllers.postController.toggleLike);
routes.get('/posts/notifications', controllers.postController.allNotifications);
routes.get('/posts/:id', controllers.postController.search);
routes.delete('/posts/notifications/:id', controllers.postController.removeNotification);
routes.get('/posts/notifications/:id', controllers.postController.searchNotification);
routes.get('/posts/user/:id', controllers.postController.friendFeed);

/**
 * Comment
 */
routes.post('/post/:id/comment', controllers.commentController.create);
routes.get('/post/:id/comments', controllers.commentController.feedByPost);
routes.put('/post/comment/:id', controllers.commentController.update);
routes.delete('/post/comment/:id', controllers.commentController.destroy);
routes.put('/post/comment/:id/like', controllers.commentController.toggleLike);
routes.get('/post/comment/:id', controllers.commentController.search);

/**
 * Error
 */
routes.use(errorMiddleware);

module.exports = routes;
