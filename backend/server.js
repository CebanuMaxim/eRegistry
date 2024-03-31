const express = require('express')
const app = express()
require('dotenv').config()
const { connectDB } = require('./config/db.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const registries = require('./routes/registryRoutes.js')
const acts = require('./routes/actRoutes.js')
const users = require('./routes/userRoutes.js')
const corsOptions = require('./middleware/corsOptions.js')

connectDB()

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', users)
app.use('/api/registries', registries)
app.use('/api/acts', acts)

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))
