const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const { connectDB } = require("./config/db.js")
const cors = require("cors")
const registries = require("./routes/registries")
const acts = require("./routes/acts")

connectDB()

app.use(cors())
app.use(express.json())
app.use("/api/registries", registries)
app.use("/api/acts", acts)

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))
