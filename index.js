const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const userRouter = require('./routers/user')
const sessionRouter = require('./routers/session')
const connectDb = require('./models/index')
require('dotenv').config()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser());
app.get('/', (req, res) => res.send('Hello world!'))
app.use('/api/users', userRouter)
app.use('/api/session', sessionRouter)

connectDb().then(() => {
  app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))
})