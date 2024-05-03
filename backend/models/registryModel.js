const mongoose = require('mongoose')
const Joi = require('joi')
const moment = require('moment')

const Registry = mongoose.model(
  'Registry',
  new mongoose.Schema({
    typographyId: {
      type: String,
      required: true,
    },
    registryId: {
      type: String,
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    acts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Act',
      },
    ],
  })
)

const customDateValidator = (value, helpers) => {
  const date = moment(value, 'DD.MM.YYYY', true)
  if (!date.isValid()) {
    return helpers.error('date.format')
  }
  return value
}

function validateRegistry(registry) {
  let schema = {}

  schema = Joi.object({
    typographyId: Joi.string()
      .pattern(/^\d{7}$/)
      .required()
      .messages({
        'string.pattern.base': 'typographyId must be a 7-digit number',
        'any.required': 'typographyId is required',
      }),
    registryId: Joi.string()
      .pattern(/^\d{4}$/)
      .required()
      .messages({
        'string.pattern.base': 'registryId must be a 4-digit number',
        'any.required': 'registryId is required',
      }),
    startDate: Joi.string()
      .custom(customDateValidator, 'custom date validation')
      .required()
      .messages({
        'date.format': '{{#label}} must be a valid date in DD.MM.YYYY format',
      }),
    endDate: Joi.string()
      .custom(customDateValidator, 'custom date validation')
      .required()
      .messages({
        'date.format': '{{#label}} must be a valid date in DD.MM.YYYY format',
      }),
    acts: Joi.array(),
    _id: Joi.string(),
    __v: Joi.number(),
  })

  return schema.validate(registry)
}

module.exports = { Registry, validateRegistry }
