import { Registry } from '../types'
import axios from '../api/axios'

export const addRegistryService = async (
  registry: Registry,
  setRegistries: React.Dispatch<React.SetStateAction<Registry[]>>
) => {
  if (registry.endDate === '') {
    registry.endDate = registry.startDate
  }

  try {
    const { data } = await axios.post('/registries', registry)

    setRegistries((prevRegistries: Registry[]) => [data, ...prevRegistries])
  } catch (err) {
    console.error(err)
  }
}

export const editRegistryService = async (
  updatedRegistry: Registry,
  registries: Registry[]
) => {
  const registry = registries.find(
    (registry) => registry._id === updatedRegistry._id
  )
  if (!registry) return

  for (const [key, value] of Object.entries(updatedRegistry)) {
    if (value) registry[key] = value
  }

  try {
    await axios.put(`/registries/${registry._id}`, registry)
  } catch (err) {
    console.error(err)
  }
}

export const deleteRegistryService = async (
  _id: string,
  registryId: string,
  setRegistries: React.Dispatch<React.SetStateAction<Registry[]>>
) => {
  const check = prompt('Enter registry id:')
  if (check === registryId) {
    try {
      await axios.delete(`/registries/${_id}`)
    } catch (err) {
      console.error(err)
    }
    setRegistries((prevRegistries) =>
      prevRegistries.filter((item) => item._id !== _id)
    )
  } else {
    alert('Wrong id')
  }
}
