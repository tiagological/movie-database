import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  poster_path: {
    type: String,
    required: true
  },
  runtime: {
    type: Number,
    required: true
  },
  release_date: {
    type: String,
    required: true
  }
});

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    watch_list: [MovieSchema]
  },
  { timestamps: true }
);

UserSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = hashSync(this.password, 10);
  }
});

UserSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};

UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
