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

// @desc      Get acts by date range
//@route      GET /api/acts
const getActsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query
  if (!startDate || !endDate) {
    return res.status(400).send('Start date and end date are required')
  }

  try {
    const acts = await Act.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    })
    res.json(acts)
  } catch (error) {
    console.error('Error fetching acts by date range:', error)
    res.status(500).send('Server error')
  }
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
  req.body.registry = req.params.registryId
  console.log(req.body)

  const { error } = await validateAct(req.body)
  console.log(error)

  if (error) return res.status(400).send(error.details[0].message)

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

  try {
    const act = await Act.findByIdAndUpdate(req.params.actId, req.body, {
      new: true,
    })

    if (!act) {
      return res.status(404).send('The act with the given ID was not found.')
    }

    res.status(200).send(act)
  } catch (err) {
    console.log(err)
    return res.status(400).send(err)
  }
}

// @desc      Delete last act from registry
// @route     DELETE /api/acts/:registryId/:actId
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

module.exports = {
  getAllActs,
  getAct,
  getActsByDateRange,
  createAct,
  editAct,
  deleteAct,
}
