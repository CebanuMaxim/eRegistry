const router = require('express').Router()
const {
  getAllActs,
  getAct,
  createAct,
  editAct,
  deleteAct,
  getActsByMonth,
} = require('../controllers/actController')

router.route('/').get(getAllActs)

router.route('/reports/:date').get(getActsByMonth)

router.route('/:actId').get(getAct).put(editAct)

router.route('/:registryId').post(createAct)

router.route('/:registryId/:actId').delete(deleteAct)

module.exports = router
