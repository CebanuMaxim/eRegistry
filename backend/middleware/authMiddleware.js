const jwt = require("jsonwebtoken")
const asyncHandler = require("./asyncHandler.js")
const { User } = require("../models/userModel.js")

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.userId).select("-password")

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  } else {
    res.json({ message: "Not authorized, no token" })
    res.status(401)
    // throw new Error("Not authorized, no token")
  }
})

module.exports = { protect }
