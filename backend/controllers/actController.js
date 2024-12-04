const { Act, validateAct } = require('../models/actModel')
const { Registry } = require('../models/registryModel')
const asyncHandler = require('express-async-handler')

// @desc      Fetch all acts
// @route     GET /api/acts/
const getAllActs = asyncHandler(async (req, res) => {
  const foundActs = await Act.find()

  if (!foundActs || foundActs.length === 0)
    return res.status(404).send('No acts')

  res.status(200).send(foundActs)
})

// @desc      Get acts by date range
//@route      GET /api/acts/reports
const getActsByDateRange = asyncHandler(async (req, res) => {
  console.log(req.body)

  const { startDate, endDate } = req.bodys
  if (!startDate || !endDate) {
    return res.status(400).send('Start date and end date are required')
  }
  const acts = await Act.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
  res.json(acts)
})

// @desc      Fetch an act
// @route     GET /api/acts/:actId
const getAct = asyncHandler(async (req, res) => {
  const foundAct = await Act.findById(req.params.actId).populate({
    path: 'registry',
    select: 'typographyId registryId',
  })

  if (!foundAct || foundAct.length === 0)
    return res.status(404).send({ success: false })

  res.status(200).send(foundAct)
})

// @desc      Create new act
// @route     POST /api/acts/:registryId
const createAct = asyncHandler(async (req, res) => {
  const { error } = await validateAct(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const act = new Act(req.body)
  const createdAct = await act.save()

  await Registry.updateOne(
    { _id: req.params.registryId },
    { $push: { acts: createdAct._id } }
  )

  res.status(200).send(createdAct)
})

// @desc      Edit act
// @route     PUT /api/acts/:actId
const editAct = asyncHandler(async (req, res) => {
  const { error } = validateAct(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const act = await Act.findByIdAndUpdate(req.params.actId, req.body, {
    new: true,
  })

  if (!act) {
    return res.status(404).send('The act with the given ID was not found.')
  }
  res.status(200).send(act)
})

// @desc      Delete last act from registry
// @route     DELETE /api/acts/:registryId/:actId
const deleteAct = asyncHandler(async (req, res) => {
  await Registry.updateOne(
    { _id: req.params.registryId },
    {
      $pull: { acts: [req.params.actId] },
    }
  )

  await Act.findByIdAndDelete(req.params.actId)

  res.send({ success: true })
})

module.exports = {
  getAllActs,
  getAct,
  getActsByDateRange,
  createAct,
  editAct,
  deleteAct,
}
