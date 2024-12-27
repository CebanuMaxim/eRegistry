const router = require('express').Router()
const {
  getAllActs,
  getAct,
  createAct,
  editAct,
  deleteAct,
  getActsByDateRange,
  getActsByMonthYear,
} = require('../controllers/actController')

router.route('/').get(getAllActs)

router.route('/reports').get(getActsByDateRange)

router.route('/reports/:monthYear').get(getActsByMonthYear)

router.route('/:actId').get(getAct).put(editAct)

router.route('/:registryId').post(createAct)

router.route('/:registryId/:actId').delete(deleteAct)

module.exports = router
