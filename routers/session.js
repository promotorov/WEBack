const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const withAuth = require('../middlewares/withAuth')
const internalError = require('./common')
const router = express.Router()

// login
router.post('/', async (req, res) => {
  try {
    const error = 'Username or password is incorrect'
    const user = await User.findOne({ email: req.body.email }).select('password _id firstName lastName')
    if (!user) {
      res.status(422).json({ error })
      return
    }
    const match = await bcrypt.compare(req.body.password, user.password)
    if (match) {
      const token = jwt.sign({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
      }, process.env.JWT_KEY, { expiresIn: '1h' })
      res.status(200).cookie('token', token, { httpOnly: true} ).json()
    }
    else
      res.status(422).json({ error })
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

// check session
router.get('/', withAuth, (req, res) => {
  res.status(200).json()
})

// logout
router.delete('/', (req, res) => {
  res.status(204).clearCookie('token').json()
})

module.exports = router