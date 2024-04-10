const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler.js')
const { User } = require('../models/userModel.js')

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password')

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const expiredTokenPayload = jwt.decode(token)
      const newToken = jwt.sign(expiredTokenPayload, process.env.JWT_SECRET)
      res.cookie('jwt', newToken, { httpOnly: true })
      req.user = expiredTokenPayload

      next()
    } else {
      return res.status(401).json({ message: 'Invalid token' })
    }
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
