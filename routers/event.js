const express = require('express')
const Favorite = require('../models/favorite')
const internalError = require('./common')
const router = express.Router()

// get event participants
router.get('/:id/participants', async (req, res) => {
  try {
    const eventId = req.params.id
    const participants = await Favorite
      .find({ eventId })
      .populate('userId', '-password -__v -email')
      .select('userId -_id')

    const result = {
      participants: participants.map(x => x.userId),
      total: participants.length
    }

    res.status(200).json(result)
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

module.exports = router