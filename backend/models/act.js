const mongoose = require('mongoose')
const Joi = require('joi')

const Act = mongoose.model('Act', new mongoose.Schema({
    actId: {
        type: String,
        required: true
    },
    registry: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Registry'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    idnp: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return val.length === 13
            },
            message: val => `${val.value} has to be 13 digits`
        }
    },
    stateFee: {
        type: Number,
        required: true,
        enum: [10, 5, 1, 0.5, 0],
    },
    notaryFee: {
        type: Number,
        required: true,
        enum: [350, 150, 0],
    }
})
)

function validateAct(registry) {
    const schema = Joi.object({
        actId: Joi.string().required(),
        registryId: Joi.string().required(),
        firstname: Joi.string().required().min(2),
        lastname: Joi.string().required().min(2),
        idnp: Joi.string().required(),
        stateFee: Joi.number().required(),
        notaryFee: Joi.number().required()
    })

    return schema.validate(registry)
}

exports.Act = Act
exports.validateAct = validateAct