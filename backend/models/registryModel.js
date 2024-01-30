const mongoose = require("mongoose")
const Joi = require("joi")

const Registry = mongoose.model(
  "Registry",
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
        ref: "Act",
      },
    ],
  })
)

function validateRegistry(registry, editing = false) {
  let schema = {}

  !editing
    ? (schema = Joi.object({
        typographyId: Joi.number().required(),
        registryId: Joi.number().required(),
        startDate: Joi.date().required(),
        endDate: Joi.string(),
      }))
    : (schema = Joi.object({
        typographyId: Joi.number(),
        registryId: Joi.number(),
        startDate: Joi.date(),
        endDate: Joi.string(),
      }))
  return schema.validate(registry)
}

module.exports = { Registry, validateRegistry }
