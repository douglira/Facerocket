const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports = {
  async me(req, res, next) {
    try {
      const me = await User.findById(req.userId).populate({
        path: 'friendsRequest',
        select: ['name', 'avatar_url', 'city', 'state'],
        options: {
          sort: {
            name: 1,
          },
        },
      });

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const user = await User.findByIdAndUpdate(
        req.userId,
        { ...req.user },
        { new: true },
      ).populate({
        path: 'friendsRequest',
        select: ['name', 'avatar_url', 'city', 'state'],
        options: {
          sort: {
            name: 1,
          },
        },
      });

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },

  async updatePassword(req, res, next) {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;

      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: 'Invalid passwords' });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Password doesn't match" });
      }

      const user = await User.findById(req.userId).select('+password');

      if (!(await user.checkPassword(oldPassword))) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      user.password = newPassword;
      await user.save();

      return res.json({ message: 'Password changed successfully' });
    } catch (err) {
      return next(err);
    }
  },

  async profile(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Missing parameter' });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const me = await User.findById(req.userId);

      const commonFriends = {
        friends: _.intersectionWith(me.friends, user.friends, _.isEqual),
        count: _.intersectionWith(me.friends, user.friends, _.isEqual).length,
      };

      return res.json({ ...user._doc, commonFriends });
    } catch (err) {
      return next();
    }
  },

  async search(req, res, next) {
    try {
      const { search } = req.query;
      const regexSearch = new RegExp(search, 'i');
      const searchUsers = [];

      const me = await User.findById(req.userId);

      const users = await User.find()
        .select(['name', 'avatar_url', 'state', 'city', 'friendsRequest', 'friends'])
        .or([{ name: regexSearch }])
        .or([{ email: regexSearch }])
        .or([{ city: regexSearch }])
        .nor([{ _id: req.userId }])
        .limit(15)
        .sort({ name: 1 });

      users.forEach((user) => {
        const status = me.relationshipStatus(user);

        searchUsers.push({
          ...user._doc,
          commonFriends: {
            count: _.intersectionWith(me.friends, user.friends, _.isEqual).length,
          },
          status,
        });
      });

      return res.json(searchUsers);
    } catch (err) {
      return next(err);
    }
  },
};
