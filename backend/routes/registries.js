const router = require("express").Router()
const { Registry, validateRegistry } = require("../models/registry")
const { Act } = require("../models/act")

// @desc      Get the list of all registries
// @route     GET /api/registries/
router.get("/", async (req, res) => {
  const foundRegistries = await Registry.find().sort({ registryId: -1 })
  if (!foundRegistries || foundRegistries.length === 0)
    return res.status(404).send("No registries")

  res.status(200).send(foundRegistries)
})

// @desc      Get registry by id
// @route     GET /api/registries/:id
router.get("/:id", async (req, res) => {
  const registry = await Registry.findById(req.params.id)
    .populate("acts")
    .sort({ actId: -1 })

  if (!registry)
    return res.status(404).send("The registry with the given ID was not found.")

  res.send(registry)
})

// @desc      Create registry
// @route     POST /api/registries
router.post("/", async (req, res) => {
  const { error } = validateRegistry(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const { typographyId, registryId, startDate, endDate } = req.body

  try {
    const registry = new Registry({
      typographyId,
      registryId,
      startDate,
      endDate,
    })

    const createdRegistry = await registry.save()

    res.status(201).send(createdRegistry)
  } catch (err) {
    console.log(err)
  }
})

// @desc      Update registry
// @route     POST /api/registries/:id
router.put("/:id", async (req, res) => {
  const { error } = validateRegistry(req.body, (editing = true))
  if (error) return res.status(400).send(error.details[0].message)

  const { typographyId, registryId, startDate, endDate } = req.body

  const registry = await Registry.findByIdAndUpdate(
    req.params.id,
    { typographyId, registryId, startDate, endDate },
    { new: true }
  )

  if (!registry)
    return res.status(404).send("The registry with the given ID was not found.")

  res.status(200).send(registry)
})

// @desc      Delete registry
// @route     POST /api/registries/:registryId/acts
router.delete("/:id", async (req, res) => {
  const registry = await Registry.findByIdAndDelete(req.params.id)
  await Act.deleteMany({ registry: req.params.id })

  if (!registry)
    return res.status(404).send("The registry with the given ID was not found.")

  res.send(registry)
})

module.exports = router
