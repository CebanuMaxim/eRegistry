const mongoose = require('mongoose')
const Joi = require('joi')
const moment = require('moment')

const Act = mongoose.model(
  'Act',
  new mongoose.Schema({
    actId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    actName: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    idnp: {
      type: String,
      required: true,
      validate: {
        validator: function (val) {
          return val.length === 13
        },
        message: (val) => `${val.value} has to be 13 digits`,
      },
    },
    stateFee: {
      type: Number,
      required: true,
      enum: [5, 1, 0.5, 0],
    },
    notaryFee: {
      type: Number,
      required: true,
      enum: [0, 30, 59, 350, 395, 399, 400, 445],
    },
    registry: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Registry',
    },
  })
)

const customDateValidator = (value, helpers) => {
  const date = moment(value, 'DD.MM.YYYY', true)
  if (!date.isValid()) {
    return helpers.error('date.format')
  }
  return value
}

function validateAct(act) {
  const schema = Joi.object({
    actId: Joi.string().pattern(/^\d+$/).required(),
    date: Joi.string()
      .custom(customDateValidator, 'custom date validation')
      .required()
      .messages({
        'date.format': '{{#label}} must be a valid date in DD.MM.YYYY format',
      }),
    actName: Joi.string().required(),
    firstname: Joi.string()
      .pattern(/^[\p{L}\p{M}]+$/u)
      .messages({
        'string.pattern.base': 'firstname must contain only letters',
        'any.required': 'firstname is required',
      }),
    lastname: Joi.string()
      .pattern(/^[\p{L}\p{M}]+$/u)
      .messages({
        'string.pattern.base': 'lastname must contain only letters',
        'any.required': 'lastname is required',
      }),
    idnp: Joi.string()
      .pattern(/^\d{13}$/)
      .messages({
        'string.pattern.base': 'idnp must be a 13-digit number',
        'any.required': 'idnp is required',
      }),
    stateFee: Joi.number().required().valid(0, 0.5, 1, 5),
    notaryFee: Joi.number().required().valid(0, 30, 59, 395, 399, 400, 445),
    registry: Joi.string(),
    _id: Joi.string(),
    __v: Joi.number(),
  })

  return schema.validate(act)
}

module.exports = { Act, validateAct }
