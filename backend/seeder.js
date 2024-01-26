const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const colors = require("colors")
const registries = require("./data/registries")
const acts = require("./data/acts")
const { Registry } = require("./models/registry")
const { Act } = require("./models/act")
const { connectDB } = require("./config/db")

connectDB()

const importData = async () => {
  try {
    await Registry.deleteMany()
    await Act.deleteMany()

    await Registry.insertMany(registries)
    await Act.insertMany(acts)

    console.log("Data Imported!".green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Registry.deleteMany()
    await Act.deleteMany()

    console.log("Data Destroyed!".red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
