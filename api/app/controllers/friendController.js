const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async requestList(req, res, next) {
    try {
      const me = User.findById(req.userId)
        .select('friendsRequest')
        .populate({
          path: 'friendsRequest',
          select: ['name', 'avatar_url'],
          options: {
            limit: 15,
            sort: {
              name: 1,
            },
          },
        });

      return res.json(me.friendsRequest);
    } catch (err) {
      return next(err);
    }
  },

  async request(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.json(400).json({ error: 'Parameter is missing' });
      }

      if (id === req.userId) {
        return res.status(400).json({ error: 'You can not add yourself' });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ error: "User doesn't exist" });
      }

      if (user.friendsRequest.indexOf(req.userId) !== -1) {
        return res.status(400).json({ error: "You've already sent a friend request" });
      }

      if (user.isFriend(req.userId)) {
        return res.status(400).json({ error: "You're both already friends" });
      }

      const me = await User.findById(req.userId);

      if (me.friendsRequest.indexOf(user.id) !== -1) {
        return res.status(400).json({
          error: `You've already received a friend request from ${
            user.name
          }. You can only accept or decline`,
        });
      }

      user.friendsRequest.push(req.userId);
      await user.save();

      return res.json();
    } catch (err) {
      return next(err);
    }
  },

  async decline(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.json(400).json({ error: 'Parameter is missing' });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (user.friendsRequest.indexOf(req.userId) !== -1) {
        user.friendsRequest.splice(user.friendsRequest.indexOf(req.userId), 1);
        user.save();

        return res.json({ message: 'Friend request successfully canceled' });
      }

      const me = await User.findById(req.userId);

      if (me.friendsRequest.indexOf(id) !== -1) {
        me.friendsRequest.splice(me.friendsRequest.indexOf(id), 1);
        me.save();

        return res.json({ error: 'Friend request successfully declined' });
      }

      return res.status(400).json({ error: 'There is nothing to be changed' });
    } catch (err) {
      return next(err);
    }
  },

  async add(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.json(400).json({ error: 'Parameter is missing' });
      }

      if (id === req.userId) {
        return res.status(400).json({ error: 'You can not add yourself' });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ error: "User doesn't exist" });
      }

      if (user.friends.indexOf(req.userId) !== -1) {
        return res.status(400).json({ error: "You're both already friends" });
      }

      const me = await User.findById(req.userId);

      if (me.friendsRequest.indexOf(user.id) === -1) {
        return res.status(400).json({ error: 'You must send a friend request first' });
      }

      me.friendsRequest.splice(me.friendsRequest.indexOf(user.id), 1);
      me.friends.push(user.id);
      me.save();

      user.friends.push(req.userId);
      await user.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.json(400).json({ error: 'Parameter is missing' });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ error: "User doesn't exist" });
      }

      const indexMe = user.friends.indexOf(req.userId);

      if (indexMe === -1) {
        return res
          .status(400)
          .json({ error: 'You can only remove the relationship unless both are friends' });
      }

      user.friends.splice(indexMe, 1);
      await user.save();

      const me = await User.findById(req.userId);
      me.friends.splice(me.friends.indexOf(id), 1);
      await me.save();

      return res.json();
    } catch (err) {
      return next(err);
    }
  },

  async all(req, res, next) {
    try {
      const me = await User.findById(req.userId)
        .select('friends')
        .populate({
          path: 'friends',
          select: ['name', 'avatar_url', 'city', 'state'],
          options: {
            limit: 15,
            sort: {
              name: 1,
            },
          },
        });

      return res.json({ friends: me.friends, friendsCount: me.friends.length });
    } catch (err) {
      return next(err);
    }
  },
};
