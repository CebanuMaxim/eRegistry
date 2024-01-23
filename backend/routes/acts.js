const express = require("express")
const router = express.Router()
const { Act, validateAct } = require("../models/act")
const { Registry, validateRegistry } = require("../models/registry")

// @desc      Get all acts
// @route     GET /api/acts/:registryId
router.get("/", async (req, res) => {
  const foundActs = await Act.find()
  if (!foundActs || foundActs.length === 0)
    return res.status(400).send("No acts")
  res.status(200).send(foundActs)
})

// @desc      Get an act
// @route     GET /api/acts/:actId
router.get("/:actId", async (req, res) => {
  const foundAct = await Act.findById({ _id: req.params.actId }).populate({
    path: "registry",
    select: "typographyId registryId",
  })
  if (!foundAct || foundAct.length === 0)
    return res.status(400).send({ success: false })
  res.status(200).send(foundAct)
})

// @desc      Create new act
// @route     GET /api/acts/:registryId
router.post("/:registryId", async (req, res) => {
  console.log(req.body)
  const { actId, date, firstname, lastname, idnp, stateFee, notaryFee } =
    req.body

  try {
    const act = new Act({
      actId,
      date,
      registry: req.params.registryId,
      firstname,
      lastname,
      idnp,
      stateFee,
      notaryFee,
    })

    const createdAct = await act.save()
    const foundRegistry = await Registry.updateOne(
      { _id: req.params.registryId },
      { $push: { acts: createdAct._id } }
    )
    res.status(200).send(createdAct)
  } catch (error) {
    res.send(error.message)
  }
})

// @desc      Update act
// @route     PUT /api/acts/
router.put("/:id", async (req, res) => {
  try {
    const _id = req.params.id
    if (!_id || _id.length !== 24)
      res.status(404).send("The act with the given ID was not found.")

    const act = await Act.updateOne({ _id: req.params.id }, req.body)
    console.log("act ", act)
    res.status(200).send({ success: true })
  } catch (error) {
    console.error(error)
  }
})

// @desc      Delete last act from registry
// @route     DELETE /api/acts/:registryId/:actId
router.delete("/:actId", async (req, res) => {
  const foundAct = await Act.findById({ _id: req.params.actId })
  if (!foundAct)
    return res.status(404).send("The act with the given ID was not found.")

  await Registry.updateOne(
    { _id: foundAct.registry.toString() },
    { $pop: { acts: 1 } }
  )

  await Act.findByIdAndDelete({ _id: req.params.actId })

  res.send({ success: true })
})

module.exports = router
