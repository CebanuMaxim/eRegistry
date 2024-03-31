const jwt = require('jsonwebtoken')

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    // sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
  })
  res.json({ message: 'Login successful', token })
}

module.exports = generateToken
