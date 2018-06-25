const mongoose = require('mongoose');

const User = mongoose.model('User');

const sendMail = require('../services/mailer');

module.exports = {
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Credentials not provided' });
      }

      const user = await User.findOne({ email })
        .select('+password')
        .populate({
          path: 'friendsRequest',
          select: ['name', 'avatar_url', 'city', 'state'],
          options: {
            sort: {
              name: 1,
            },
          },
        });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      user.password = undefined;

      return res.json({ user, token: await user.generateToken() });
    } catch (err) {
      return next(err);
    }
  },

  async signup(req, res, next) {
    try {
      const { email, password, confirmPassword } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ error: 'User already exists' });
      }

      if (!password || password !== confirmPassword) {
        return res.status(400).json({ error: 'Please, send a valid password' });
      }

      const user = await User.create(req.body);
      return res.status(201).json({ user, token: await user.generateToken() });
    } catch (err) {
      return next(err);
    }
  },

  async forgotPass(req, res, next) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Invalid email' });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
      }

      await user.resetPass();
      await user.save();
      sendMail({
        from: 'Test App <test.app@mail.com>',
        to: email,
        subject: 'FACEROCKET - Redefinição de senha',
        template: 'auth/resetPassToken',
        context: {
          email,
          token: user.passwordResetToken,
        },
      });

      return res.json({
        message: 'Successfully password reset request. You will receive an email shortly',
      });
    } catch (err) {
      return next(err);
    }
  },

  async resetPass(req, res, next) {
    try {
      const { token, password, confirmPassword } = req.body;

      if (!token) {
        return res.status(400).json({ error: 'Token not provided' });
      }

      if (!password || !confirmPassword) {
        return res.status(400).json({ error: 'Invalid passwords' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Password doesn't match" });
      }

      const user = await User.findOne({ passwordResetToken: token });

      if (!user) {
        return res.status(400).json({ error: 'Invalid token provided' });
      }

      const expiresIn = user.passwordResetExpiresIn;
      const now = new Date();

      if (now > expiresIn) {
        return res
          .status(400)
          .json({ error: 'Token expired. Please require again to reset password' });
      }

      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpiresIn = undefined;
      await user.save();

      return res.json();
    } catch (err) {
      return next(err);
    }
  },
};
