const router = require('express').Router()
const {
  getRegistries,
  getRegistryById,
  createRegistry,
  editRegistry,
  deleteRegistry,
} = require('../controllers/registryController')
const { protect } = require('../middleware/authMiddleware.js')

router.route('/').get(protect, getRegistries).post(createRegistry)

router
  .route('/:id')
  .get(getRegistryById)
  .put(editRegistry)
  .delete(deleteRegistry)

module.exports = router
