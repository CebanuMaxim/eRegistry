const mongoose = require('mongoose')
const Joi = require('joi')

const dateRegex = /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/
const dateRegexMessage = (val) =>
  `${val.value} has to be a valid date in 'YYYY-MM-DD' format`

const Act = mongoose.model(
  'Act',
  new mongoose.Schema({
    actId: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
      validate: {
        validator: function (val) {
          return dateRegex.test(val)
        },
        message: (val) => dateRegexMessage(val),
      },
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
      enum: [0, 350, 395, 399, 400, 445],
    },
    registry: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Registry',
    },
  })
)

function validateAct(act) {
  const schema = Joi.object({
    actId: Joi.number().required(),
    date: Joi.date().required(),
    actName: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    idnp: Joi.string()
      .pattern(/^\d{13}$/)
      .required()
      .messages({
        'string.pattern.base': 'idnp must be a 13-digit number',
        'any.required': 'idnp is required',
      }),
    stateFee: Joi.number().required().valid(0, 0.5, 1, 5),
    notaryFee: Joi.number().required().valid(0, 395, 399, 400),
    registry: Joi.string(),
    _id: Joi.string(),
    __v: Joi.number(),
  })

  return schema.validate(act)
}

module.exports = { Act, validateAct }
