const router = require("express").Router()
const {
  getAllActs,
  getAct,
  createAct,
  editAct,
  deleteAct,
} = require("../controllers/actController")

// @desc      Fetch all acts
// @route     GET /api/acts/
router.route("/").get(getAllActs)

// @desc      Fetch an act
// @route     GET /api/acts/:actId
router.route("/:actId").get(getAct)

// @desc      Create new act
// @route     POST /api/acts/:registryId
router.route("/:registryId").post(createAct)

// @desc      Edit act
// @route     PUT /api/acts/
router.route("/:id").put(editAct)

// @desc      Delete last act from registry
// @route     DELETE /api/acts/:actId
router.route("/:registryId/:actId").delete(deleteAct)

module.exports = router
