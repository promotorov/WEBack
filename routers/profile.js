const express = require('express')
const Favorite = require('../models/favorite')
const internalError = require('./common')
const router = express.Router()

// add favorite
router.post('/favorites', async (req, res) => {
  try {
    const eventId = req.body.eventId
    const userId = req.user._id

    if (!eventId) {
      res.status(422).json({ error: 'Missed eventId parameter' })
      return
    }

    if (await Favorite.findOne({ eventId, userId })) {
      res.status(409).json({ error: 'User already has event in favorites' })
      return
    }

    await Favorite.create({ userId, eventId })
    res.status(201).json()
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

// get favorites
router.get('/favorites', async (req, res) => {
  try {
    const userId = req.user._id;
    const favorites = await Favorite.find({userId}).select('eventId -_id')
    res.status(200).json(favorites)
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

// delete favorite
router.delete('/favorites/:id', async (req, res) => {
  try {
    const eventId = req.params.id
    const userId = req.user._id

    if (await Favorite.findOneAndDelete({ eventId, userId }))
      res.status(204).json()
    else
      res.status(404).json({ error: 'User has not event in favorites' })
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

module.exports = router