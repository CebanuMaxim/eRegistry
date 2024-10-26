const express = require('express')
const app = express()
require('dotenv').config()
const { connectDB } = require('./config/db.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const registries = require('./routes/registryRoutes.js')
const acts = require('./routes/actRoutes.js')
const users = require('./routes/userRoutes.js')

connectDB()

app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', users)
app.use('/api/registries', registries)
app.use('/api/acts', acts)

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))
