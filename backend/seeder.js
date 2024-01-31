const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const colors = require('colors')
const registries = require('./data/registries')
const acts = require('./data/acts')
const user = require('./data/user')
const { Registry } = require('./models/registryModel')
const { Act } = require('./models/actModel')
const { User } = require('./models/userModel')
const { connectDB } = require('./config/db')

connectDB()

const importData = async () => {
  try {
    await Registry.deleteMany()
    await Act.deleteMany()
    await User.deleteMany()

    await Registry.insertMany(registries)
    await Act.insertMany(acts)
    await User.insertMany(user)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Registry.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
