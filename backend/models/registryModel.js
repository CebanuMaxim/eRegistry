const mongoose = require('mongoose')
const Joi = require('joi')

const Registry = mongoose.model(
  'Registry',
  new mongoose.Schema({
    typographyId: {
      type: String,
      required: true,
      validate: {
        validator: function (val) {
          return val.length === 7
        },
        message: (val) => `${val.value} has to be 7 digits`,
      },
    },
    registryId: {
      type: String,
      required: true,
      validate: {
        validator: function (val) {
          return val.length === 4
        },
        message: (val) => `${val.value} has to be 4 digits`,
      },
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
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
    typographyId: Joi.number().required(),
    registryId: Joi.number().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string(),
    acts: Joi.array(),
    _id: Joi.string(),
    __v: Joi.number(),
  })
  return schema.validate(registry)
}

module.exports = { Registry, validateRegistry }
