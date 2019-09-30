const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()
const userRouter = require('./routers/user')
const sessionRouter = require('./routers/session')
const movieRouter = require('./routers/movie')
const connectDb = require('./models/index')

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser());
app.get('/', (req, res) => res.send('Hello world!'))
app.use('/api/users', userRouter)
app.use('/api/session', sessionRouter)
app.use('/api/movies', movieRouter)

connectDb().then(() => {
  app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
})