const express = require('express')
const app = express()

const router = require('express').Router()
const {
  getAllActs,
  getAct,
  createAct,
  editAct,
  deleteAct,
  getActsByMonth,
} = require('../controllers/actController')

const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').get(protect, getAllActs)
router.route('/:registryId').post(protect, createAct)
router.route('/:actId').get(protect, getAct).put(protect, editAct)

router.route('/:registryId/:actId').delete(protect, admin, deleteAct)
router.route('/reports/:date').get(getActsByMonth)

module.exports = router
