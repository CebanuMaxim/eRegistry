const mongoose = require('mongoose')
const Joi = require('joi')

const dateRegex = /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/
const dateRegexMessage = (val) =>
  `${val.value} has to be a valid date in 'YYYY-MM-DD' format`

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
      validate: {
        validator: function (val) {
          return dateRegex.test(val)
        },
        message: (val) => dateRegexMessage(val),
      },
    },
    endDate: {
      type: String,
      validate: {
        validator: function (val) {
          return dateRegex.test(val)
        },
        message: (val) => dateRegexMessage(val),
      },
    },
    acts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Act',
      },
    ],
  })
)

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
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    acts: Joi.array(),
    _id: Joi.string(),
    __v: Joi.string(),
  })

  return schema.validate(registry)
}

module.exports = { Registry, validateRegistry }
