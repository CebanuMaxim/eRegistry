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
router.route('/logout').post(logoutUser)

router
  .route('/')
  .post(protect, admin, registerUser)
  .get(protect, admin, getUsers)
router
  .route('/:id')
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)

module.exports = router
