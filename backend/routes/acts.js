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
  const {
    actId,
    date,
    actName,
    firstname,
    lastname,
    idnp,
    stateFee,
    notaryFee,
  } = req.body

  try {
    const act = new Act({
      actId,
      date,
      firstname,
      lastname,
      idnp,
      actName,
      stateFee,
      notaryFee,
      registry: req.params.registryId,
    })

    const createdAct = await act.save()
    await Registry.updateOne(
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
  const { error } = validateAct(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  if (req.params.id.length !== 24) return res.status(400).send("Invalid id.")

  const {
    actId,
    date,
    firstname,
    lastname,
    idnp,
    actName,
    stateFee,
    notaryFee,
  } = req.body

  const act = await Act.findByIdAndUpdate(
    req.params.id,
    { actId, date, firstname, lastname, idnp, actName, stateFee, notaryFee },
    { new: true }
  )

  if (!act)
    return res.status(404).send("The act with the given ID was not found.")
  res.status(200).send(act)
})

// @desc      Delete last act from registry
// @route     DELETE /api/acts/:actId
router.delete("/:id", async (req, res) => {
  const foundAct = await Act.findById(req.params.id)
  if (!foundAct)
    return res.status(404).send("The act with the given ID was not found.")

  await Registry.updateOne(
    { _id: foundAct.registry.toString() },
    { $pop: { acts: 1 } }
  )

  await Act.findByIdAndDelete({ _id: req.params.id })

  res.send({ success: true })
})

module.exports = router
