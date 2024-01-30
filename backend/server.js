const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const { connectDB } = require("./config/db.js")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const registries = require("./routes/registryRoutes.js")
const acts = require("./routes/actRoutes.js")
const users = require("./routes/userRoutes.js")

connectDB()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/users", users)
app.use("/api/registries", registries)
app.use("/api/acts", acts)

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))
