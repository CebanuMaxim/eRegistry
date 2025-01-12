const router = require('express').Router()
const {
  getRegistries,
  getRegistryById,
  createRegistry,
  editRegistry,
  deleteRegistry,
} = require('../controllers/registryController')

const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').get(protect, getRegistries).post(protect, createRegistry)

router
  .route('/:id')
  .put(protect, editRegistry)
  .get(protect, getRegistryById)
  .delete(admin, deleteRegistry)

module.exports = router
