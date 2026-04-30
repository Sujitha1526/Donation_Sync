import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'donor', 'organization', 'volunteer'],
    required: true,
  },
  donationCount: {
    type: Number,
    default: 0,
  },
  contributionCount: {
    type: Number,
    default: 0,
  },
  totalContributions: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    default: 'Bronze',
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;