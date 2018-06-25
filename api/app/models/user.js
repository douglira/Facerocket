const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authConfig = require('../../config/auth');

const UserSchema = new mongoose.Schema({
  avatar_url: {
    type: String,
    default: 'http://localhost:3001/default-user.png',
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  birthday: {
    type: Date,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    select: false,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendsRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  passwordResetToken: {
    type: String,
    uppercase: true,
  },
  passwordResetExpiresIn: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.index({ email: 1 });
UserSchema.index({ friends: 1 });
UserSchema.index({ friendsRequest: 1 });
UserSchema.index({ posts: -1 });
UserSchema.index({ email: 1, password: 1 });
UserSchema.index({ city: -1 });
UserSchema.index({ name: -1 });
UserSchema.index({ name: -1, city: -1 });

UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  },

  generateToken() {
    return jwt.sign(
      {
        _id: this._id,
        name: this.name,
        email: this.email,
      },
      authConfig.secret,
      { expiresIn: authConfig.expireTokenTime },
    );
  },

  resetPass() {
    const token = crypto
      .randomBytes(16)
      .toString('hex')
      .toUpperCase();
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 10);

    this.passwordResetToken = token;
    this.passwordResetExpiresIn = expiresIn;
  },

  isFriend(id) {
    const index = this.friends.indexOf(id);
    return index !== -1;
  },

  relationshipStatus(user) {
    if (this.isFriend(user._id)) {
      return 'friend';
    } else if (this.friendsRequest.indexOf(user._id) !== -1) {
      return 'request_received';
    } else if (user.friendsRequest.indexOf(this._id) !== -1) {
      return 'request_sent';
    }
    return 'unknown';
  },
};

UserSchema.statics.getFeedPosts = function (id) {
  return this.findById(id)
    .select(['posts', 'friends'])
    .populate({
      path: 'posts',
      options: {
        limit: 15,
      },
      populate: {
        path: 'author',
        select: ['name', 'avatar_url'],
      },
    })
    .populate({
      path: 'friends',
      select: 'posts',
      populate: {
        path: 'posts',
        options: {
          limit: 15,
        },
        populate: {
          path: 'author',
          select: ['name', 'avatar_url'],
        },
      },
    });
};

mongoose.model('User', UserSchema);
