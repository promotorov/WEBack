const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  secondName: {
    type: String,
    required: true
  },
  // true - male; false - female
  gender: {
    type: Boolean,
    required: true
  }
})

module.exports =  mongoose.model('User', userSchema)