const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength:3, maxlength:50},
  username: {type: String, required: true, minlength:3, maxlength:50, unique: true},
  password: {type: String, required: true, minlength:6},
  sigplay_user: String,
  sigplay_pass: String,
  admin: {type: Boolean, default: false},
  access: {type: Number, default: 0},
  created_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User', userSchema)