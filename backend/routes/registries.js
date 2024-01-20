const express = require('express')
const router = express.Router()
const { Registry, validateRegistry } = require('../models/registry')
const { Act } = require('../models/act')

// @desc      Get the list of all registries
// @route     GET /api/registries/
router.get('/', async (req, res) => {
    const foundRegistries = await Registry.find().sort({ registryId: -1 })
    if (!foundRegistries || foundRegistries.length === 0) return res.status(400).send('No registries')
    res.status(200).send(foundRegistries)
})

// @desc      Get registry by id
// @route     POST /api/registries/:id
router.get('/:id', async (req, res) => {
    const registry = await Registry.findById({ _id: req.params.id }).populate('acts')
    if (!registry) return res.status(404).send('The registry with the given ID was not found.')
    res.send(registry)
})

// @desc      Create registry
// @route     POST /api/registries
router.post('/', async (req, res) => {
    const { error } = validateRegistry(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const { typographyId, registryId } = req.body

    try {
        const registry = new Registry({
            typographyId,
            registryId
        })

        const createdRegistry = await registry.save()
        res.status(201).send(createdRegistry)

    } catch (err) {
        console.log(err)
    }
})

// @desc      Update registry
// @route     POST /api/registries/:id
router.put('/:id', async (req, res) => {
    const { error } = validateRegistry(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    if (req.params.id.length !== 24) return res.status(400).send('Invalid id.')

    const { typographyId, registryId, acts } = req.body
    const registry = await Registry.findByIdAndUpdate(
        req.params.id,
        { typographyId, registryId, acts },
        { new: true }
    )

    if (!registry) return res.status(404).send('The registry with the given ID was not found.')
    res.status(200).send(registry)
})

// @desc      Delete registry
// @route     POST /api/registries/:registryId/acts 
router.delete('/:id', async (req, res) => {
    const registry = await Registry.findByIdAndDelete(req.params.id)
    const deletedActs = await Act.deleteMany({ registry: req.params.id })

    if (!registry) return res.status(404).send('The registry with the given ID was not found.')
    res.send(registry)
})

module.exports = router