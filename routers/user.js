const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const internalError = require('./common')
const router = express.Router()

// add new user
router.post('/', async (req, res) => {
  try {
    if(!(await User.findOne({ email: req.body.email }))) {
      const hash = await bcrypt.hash(req.body.password, 10)
      const user = { ...req.body, password: hash }
      await User.create(user)
      res.status(201).json()
    }
    else
      res.status(409).json({ error: 'There is a user with such email' })
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

// get all the users
router.get('/', async (req, res) => {
  try {
    const filter = req.query.email ? {email: req.query.email} : {}
    const users = await User.find(filter).select('-__v -password')
    res.status(200).json(users)
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

// get user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v -password')
    if (user)
      res.status(200).json(user)
    else
      res.status(404).json({ error: 'No user with such id' })
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

// update user
router.put('/', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id })
    if (user)
      res.status(204).json()
    else
      res.status(404).json({ error: 'No user with such id' })
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

// delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id })
    if (user)
      res.status(204).json()
    else
      res.status(404).json({ error: 'No user with such id' })
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

module.exports = router