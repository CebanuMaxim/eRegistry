const { Act, validateAct } = require("../models/act")
const { Registry } = require("../models/registry")

const getAllActs = async (req, res) => {
  const foundActs = await Act.find()

  if (!foundActs || foundActs.length === 0)
    return res.status(404).send("No acts")

  res.status(200).send(foundActs)
}

const getAct = async (req, res) => {
  const foundAct = await Act.findById(req.params.actId).populate({
    path: "registry",
    select: "typographyId registryId",
  })

  if (!foundAct || foundAct.length === 0)
    return res.status(404).send({ success: false })

  res.status(200).send(foundAct)
}

const createAct = async (req, res) => {
  const { error } = validateAct(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  req.body.registry = req.params.registryId

  try {
    const act = new Act(req.body)

    const createdAct = await act.save()
    await Registry.updateOne(
      { _id: req.params.registryId },
      { $push: { acts: createdAct._id } }
    )
    res.status(200).send(createdAct)
  } catch (error) {
    res.send(error.message)
  }
}

const editAct = async (req, res) => {
  const { error } = validateAct(req.body, { editing: true })
  if (error) return res.status(400).send(error.details[0].message)

  const act = await Act.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  if (!act)
    return res.status(404).send("The act with the given ID was not found.")
  res.status(200).send(act)
}

const deleteAct = async (req, res) => {
  await Registry.updateOne(
    { _id: req.params.registryId },
    {
      $pull: { acts: [req.params.actId] },
    }
  )

  await Act.findByIdAndDelete(req.params.actId)

  res.send({ success: true })
}

module.exports = { getAllActs, getAct, createAct, editAct, deleteAct }
