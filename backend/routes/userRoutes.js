const express = require("express")
const {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  getUsers,
} = require("../controllers/userController.js")
const { protect } = require("../middleware/authMiddleware.js")

const router = express.Router()

router.route("/").post(registerUser).get(protect, getUsers)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/:id").put(protect, updateUser)

module.exports = router
