const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler.js')
const { User } = require('../models/userModel.js')

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  // let token
  const token = req.headers.authorization

  if (token) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET) // Remove "Bearer " prefix
      console.log(decoded)
      req.user = await User.findById(decoded.userId).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.json({ message: 'Not authorized, no token' })
    res.status(401)
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
