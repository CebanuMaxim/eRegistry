const mongoose = require('mongoose')
const Joi = require('joi')

const Registry = mongoose.model('Registry', new mongoose.Schema({
    typographyId: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return val.length === 7
            },
            message: val => `${val.value} has to be 7 digits`
        }
    },
    registryId: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return val.length === 4
            },
            message: val => `${val.value} has to be 4 digits`
        }
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    acts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Act"
    }]
})
)

function validateRegistry(registry) {
    const schema = Joi.object({
        typographyId: Joi.string().required(),
        registryId: Joi.string().required()
    })

    return schema.validate(registry)
}

exports.Registry = Registry
exports.validateRegistry = validateRegistry