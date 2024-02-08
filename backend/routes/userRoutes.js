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

app.use(protect)

router.route('/logout').post(logoutUser)

app.use(admin)

router.route('/').post(registerUser).get(getUsers)
router.route('/:id').put(updateUser).delete(deleteUser).get(getUserById)

module.exports = router
