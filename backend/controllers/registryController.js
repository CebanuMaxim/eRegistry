const { Registry, validateRegistry } = require("../models/registry")
const { Act } = require("../models/act")

const getRegistries = async (req, res) => {
  const foundRegistries = await Registry.find().sort({ registryId: -1 })
  if (!foundRegistries || foundRegistries.length === 0)
    return res.status(404).send("No registries")

  res.status(200).send(foundRegistries)
}

const getRegistryById = async (req, res) => {
  const registry = await Registry.findById(req.params.id)
    .populate("acts")
    .sort({ actId: -1 })

  if (!registry)
    return res.status(404).send("The registry with the given ID was not found.")

  res.send(registry)
}

const createRegistry = async (req, res) => {
  const { error } = validateRegistry(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  try {
    const registry = new Registry(req.body)
    await registry.save()

    res.status(201).send({ success: true })
  } catch (err) {
    console.log(err)
  }
}

const editRegistry = async (req, res) => {
  const { error } = validateRegistry(req.body, (editing = true))
  if (error) return res.status(400).send(error.details[0].message)

  const registry = await Registry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  if (!registry)
    return res.status(404).send("The registry with the given ID was not found.")

  res.status(200).send(registry)
}

const deleteRegistry = async (req, res) => {
  const registry = await Registry.findByIdAndDelete(req.params.id)
  await Act.deleteMany({ registry: req.params.id })

  if (!registry)
    return res.status(404).send("The registry with the given ID was not found.")

  res.send(registry)
}

module.exports = {
  getRegistries,
  getRegistryById,
  createRegistry,
  editRegistry,
  deleteRegistry,
}
