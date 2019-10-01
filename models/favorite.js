const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventId: {
    type: String,
    required: true
  }
})

module.exports =  mongoose.model('Favorite', favoriteSchema)