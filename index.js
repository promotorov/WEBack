const express = require('express')
const app = express()
const userRouter = require('./routers/user')
const connectDb = require('./models/index')
require('dotenv').config()

app.use(express.json())
app.get('/', (req, res) => res.send('Hello world!'))
app.use('/api/users', userRouter)

connectDb().then(() => {
  app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
})