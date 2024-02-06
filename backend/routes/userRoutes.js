const express = require('express')
const {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  getUsers,
  deleteUser,
  getUserById,
} = require('../controllers/userController.js')
const { protect, admin } = require('../middleware/authMiddleware.js')

const router = express.Router()

router
  .route('/')
  .post(protect, admin, registerUser)
  .get(protect, admin, getUsers)
router.route('/login').post(loginUser)
router.route('/logout').post(protect, logoutUser)
router
  .route('/:id')
  .put(protect, updateUser)
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)

module.exports = router
