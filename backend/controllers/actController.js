const { Act, validateAct } = require('../models/actModel')
const { Registry } = require('../models/registryModel')

// @desc      Fetch all acts
// @route     GET /api/acts/
const getAllActs = async (req, res) => {
  const foundActs = await Act.find()

  if (!foundActs || foundActs.length === 0)
    return res.status(404).send('No acts')

  res.status(200).send(foundActs)
}

// @desc      Fetch an act
// @route     GET /api/acts/:actId
const getAct = async (req, res) => {
  const foundAct = await Act.findById(req.params.actId).populate({
    path: 'registry',
    select: 'typographyId registryId',
  })

  if (!foundAct || foundAct.length === 0)
    return res.status(404).send({ success: false })

  res.status(200).send(foundAct)
}

// @desc      Create new act
// @route     POST /api/acts/:registryId
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

// @desc      Edit act
// @route     PUT /api/acts/:actId
const editAct = async (req, res) => {
  const { error } = validateAct(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let act
  try {
    act = await Act.findByIdAndUpdate(req.params.actId, req.body, {
      new: true,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).send(err)
  }

  if (!act)
    return res.status(404).send('The act with the given ID was not found.')
  res.status(200).send(act)
}

// @desc      Delete last act from registry
// @route     DELETE /api/acts/:actId
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
