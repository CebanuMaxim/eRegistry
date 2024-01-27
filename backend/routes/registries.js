const router = require("express").Router()
const {
  getRegistries,
  getRegistryById,
  createRegistry,
  editRegistry,
  deleteRegistry,
} = require("../controllers/registryController")

// @desc      Fetch all registries
// @route     GET /api/registries/
router.route("/").get(getRegistries)

// @desc      Fetch registry by id
// @route     GET /api/registries/:id
router.route("/:id").get(getRegistryById)

// @desc      Create registry
// @route     POST /api/registries
router.route("/").post(createRegistry)

// @desc      Edit registry
// @route     POST /api/registries/:id
router.put("/:id", editRegistry)

// @desc      Delete registry
// @route     POST /api/registries/:registryId/acts
router.route("/:id").delete(deleteRegistry)

module.exports = router
