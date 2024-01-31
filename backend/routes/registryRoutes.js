const router = require("express").Router()
const {
  getRegistries,
  getRegistryById,
  createRegistry,
  editRegistry,
  deleteRegistry,
} = require("../controllers/registryController")

router.route("/").get(getRegistries).post(createRegistry)

router
  .route("/:id")
  .get(getRegistryById)
  .put(editRegistry)
  .delete(deleteRegistry)

module.exports = router
