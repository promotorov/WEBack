const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, options)
}

module.exports = connectDb