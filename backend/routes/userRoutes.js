const express = require('express')
const app = express()

const {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  getUsers,
  deleteUser,
  getUserById,
} = require('../controllers/userController.js')

const router = express.Router()
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/login').post(loginUser)

router.route('/logout').post(protect, logoutUser)

router.route('/').post(admin, registerUser).get(admin, getUsers)
router
  .route('/:id')
  .put(admin, updateUser)
  .delete(admin, deleteUser)
  .get(admin, getUserById)

module.exports = router
