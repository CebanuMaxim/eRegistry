const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Joi = require('joi')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
  })

  return schema.validate(user)
}
module.exports = { User, validateUser }
