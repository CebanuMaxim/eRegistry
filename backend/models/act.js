const mongoose = require("mongoose")
const Joi = require("joi")

const Act = mongoose.model(
  "Act",
  new mongoose.Schema({
    actId: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
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
      type: Number,
      required: true,
      validate: {
        validator: function (val) {
          return val.toString().length === 13
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
      enum: [0, 395, 399, 400, 445],
    },
    registry: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Registry",
    },
  })
)

function validateAct(registry) {
  const schema = Joi.object({
    actId: Joi.number().required(),
    date: Joi.date().required(),
    actName: Joi.string().required(),
    firstname: Joi.string().required().min(2).max(20),
    lastname: Joi.string().required().min(2).max(20),
    idnp: Joi.number().required(),
    stateFee: Joi.number().required().valid("n/p", 0.5, 1, 5),
    notaryFee: Joi.number().required(),
    registryId: Joi.number(),
  })

  return schema.validate(registry)
}

exports.Act = Act
exports.validateAct = validateAct
