const mongoose = require('mongoose')
const Joi = require('joi')
const moment = require('moment')

const Act = mongoose.model(
  'Act',
  new mongoose.Schema(
    {
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
      lastname: {
        type: String,
        required: true,
      },
      firstname: {
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
      },
      notaryFee: {
        type: Number,
        required: true,
      },
      registry: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Registry',
      },
    },
    {
      timestamps: true,
    }
  )
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
    lastname: Joi.string()
      .pattern(/^[\p{L}\p{M}-]+$/u)
      .messages({
        'string.pattern.base': 'lastname must contain only letters',
        'any.required': 'lastname is required',
      }),
    firstname: Joi.string()
      .pattern(/^[\p{L}\p{M}-]+$/u)
      .messages({
        'string.pattern.base': 'firstname must contain only letters',
        'any.required': 'firstname is required',
      }),
    idnp: Joi.string()
      .pattern(/^\d{13}$|^UKR-[A-Z]{2}-\d{6}$/)
      .messages({
        'string.pattern.base': 'idnp must be a 13-digit number',
        'any.required': 'idnp is required',
      }),
    stateFee: Joi.number().required(),
    notaryFee: Joi.number().required(),
    registry: Joi.string(),
    _id: Joi.string(),
    __v: Joi.number(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  })

  return schema.validate(act)
}

module.exports = { Act, validateAct }
