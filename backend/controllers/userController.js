const asyncHandler = require('express-async-handler')
const { User, validateUser } = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

// @desc    Register a new user
// @route   POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { error } = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.create(req.body)

  if (user) {
    res.status(201).json(user)
  } else {
    res.status(400)
    throw new Error('Invalid user data.')
  }
})

// @desc    Get all users
// @route   GET /api/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Get all users
// @route   GET /api/users
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.find({ _id: req.params.id })
  if (!user) {
    res.status(404).json({ message: 'User not found' })
  }
  res.json(user)
})

// @desc    Update user
// @route   PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.isAdmin = req.body.isAdmin || user.isAdmin

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Delete user
// @route   DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404).json('User not found')
  } else {
    await User.deleteOne({ _id: user._id })
    res.json({ message: 'User removed' })
  }
})

// Function to convert a UNIX timestamp to local time
function convertToLocalTime(timestamp) {
  const date = new Date(timestamp * 1000) // Multiply by 1000 to convert seconds to milliseconds
  const options = {
    timeZone: 'Europe/Chisinau',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }
  return date.toLocaleString('en-US', options)
}

// @desc    Login user & get token
// @route   POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1m',
      }
    )
    res.cookie('jwt', token, {
      httpOnly: true,
    })

    const exp = jwt.decode(token).exp
    const expLocalTime = convertToLocalTime(exp)

    res.json({
      id: user._id,
      isAdmin: user.isAdmin,
      message: `Login successful. Expires: ${expLocalTime}`,
    })
  } else {
    res.status(401).json({ message: 'Invalid username or password...' })
  }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
const logoutUser = (req, res) => {
  res.clearCookie('jwt')
  res.status(200).json({ message: 'Logged out successfully' })
}

module.exports = {
  getUsers,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  deleteUser,
  getUserById,
}
