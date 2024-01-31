const asyncHandler = require('../middleware/asyncHandler.js')
const generateToken = require('../utils/generateToken.js')
const { User, validateUser } = require('../models/userModel.js')

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Login user & get token
// @route   POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body

  const user = await User.findOne({ name })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.json({
      _id: user._id,
      name: user.name,
    })
  } else {
    res.status(401).json({ message: 'Invalid name or password' })
    throw new Error('Invalid name or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { error } = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.create(req.body)

  if (user) {
    generateToken(res, user._id)

    res.status(201).json({ success: true })
  } else {
    res.status(400)
    throw new Error('Invalid user data.')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name

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

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
const logoutUser = (req, res) => {
  // localStorage.removeItem('userInfo')
  res.clearCookie('jwt')
  res.status(200).json({ message: 'Logged out successfully' })
}

// @desc    Delete user
// @route   DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await User.deleteOne({ _id: user._id })
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

module.exports = {
  getUsers,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  deleteUser,
}
