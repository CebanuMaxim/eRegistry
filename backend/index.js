const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const registries = require('./routes/registries')
const acts = require('./routes/acts')

mongoose.connect('mongodb://127.0.0.1:27017/registryapi')
    .then(() => console.log('Connected to registryapi...'))
    .catch(err => console.error('connection error...', err)
    )

app.use(express.json())
app.use('/api/registries', registries)
app.use('/api/acts', acts)

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))