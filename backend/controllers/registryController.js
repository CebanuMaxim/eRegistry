const { Registry, validateRegistry } = require('../models/registryModel')
const { Act } = require('../models/actModel')
const asyncHandler = require('express-async-handler')

// @desc      Create registry
// @route     POST /api/registries
const createRegistry = asyncHandler(async (req, res) => {
  const { error } = validateRegistry(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const registry = new Registry(req.body)

  await registry.save()

  res.status(201).send(registry)
})

// @desc      Fetch all registries
// @route     GET /api/registries/
const getRegistries = asyncHandler(async (req, res) => {
  const foundRegistries = await Registry.find()

  if (!foundRegistries || foundRegistries.length === 0) {
    return res.status(204).send({ message: 'No registries' })
  }

  res.status(200).send(foundRegistries)
})

// @desc      Fetch registry by id
// @route     GET /api/registries/:id
const getRegistryById = asyncHandler(async (req, res) => {
  const registry = await Registry.findById(req.params.id).populate('acts')
  if (!registry)
    return res.status(404).send('The registry with the given ID was not found.')

  if (registry.acts.length === 0) return res.send('No acts in this registry')

  res.send(registry)
})

// @desc      Edit registry
// @route     POST /api/registries/:id
const editRegistry = asyncHandler(async (req, res) => {
  const { error } = validateRegistry(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const registry = await Registry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  if (!registry)
    return res.status(404).send('The registry with the given ID was not found.')

  res.status(200).send(registry)
})

// @desc      Delete registry
// @route     POST /api/registries/:id
const deleteRegistry = asyncHandler(async (req, res) => {
  const registry = await Registry.findByIdAndDelete(req.params.id)
  await Act.deleteMany({ registry: req.params.id })

  if (!registry)
    return res.status(404).send('The registry with the given ID was not found.')

  res.send(registry)
})

module.exports = {
  getRegistries,
  getRegistryById,
  createRegistry,
  editRegistry,
  deleteRegistry,
}
