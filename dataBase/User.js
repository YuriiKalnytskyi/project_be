const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, require: true },
  firstname: { type: String, require: true },
  age: { type: Number },
  gender: { type: String },
  avatar: { type: String, default: '' },
  phone: { type: Number },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gallery: [{
    type: String
  }],

}, { timestamps: true });

module.exports = model('User', userSchema);
