const router = require('express').Router()
const {
  getRegistries,
  getRegistryById,
  createRegistry,
  editRegistry,
  deleteRegistry,
} = require('../controllers/registryController')

const { protect } = require('../middleware/authMiddleware.js')

router.route('/').get(protect, getRegistries).post(protect, createRegistry)

router
  .route('/:id')
  .put(protect, editRegistry)
  .delete(protect, deleteRegistry)
  .get(protect, getRegistryById)

module.exports = router
