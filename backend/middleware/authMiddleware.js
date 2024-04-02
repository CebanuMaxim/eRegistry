const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler.js')
const { User } = require('../models/userModel.js')

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET) // Remove "Bearer " prefix

    req.user = await User.findById(decoded.userId).select('-password')

    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Not authorized, no token' })
  }
})

// Admin middleware
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
})

module.exports = { protect, admin }
