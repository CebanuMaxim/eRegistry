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
  .put(editRegistry)
  .delete(deleteRegistry)
  .get(getRegistryById)

module.exports = router
