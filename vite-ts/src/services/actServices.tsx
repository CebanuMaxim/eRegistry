import axios from '../api/axios'
import { Act } from '../types'
import { toast } from 'react-toastify'

export const addActService = async (
  act: Act,
  setActs: React.Dispatch<React.SetStateAction<Act[]>>,
  id: string
) => {
  try {
    await axios.post(`/acts/${id}`, act)

    setActs((prevActs) => [act, ...prevActs])
  } catch (err: unknown) {
    console.log(err)
    if (typeof err === 'object' && err !== null && 'response' in err) {
      const axiosError = err as { response: { data: string } }
      toast.error(axiosError.response.data)
    }
  }
}

export const editActService = async (updatedAct: Act, acts: Act[]) => {
  const act = acts.find((act) => act._id === updatedAct._id)

  if (!act) {
    console.error('Act not found')
    return
  }

  for (const [key, value] of Object.entries(updatedAct)) {
    if (value) act[key] = value
  }

  try {
    await axios.put(`/acts/${act._id}`, act)
  } catch (err) {
    console.error(err)
  }
}

export const deleteActService = async (
  _id: string,
  actNumber: string,
  registryId: string,
  acts: Act[],
  setActs: React.Dispatch<React.SetStateAction<Act[]>>
) => {
  const checkActNumber = prompt('Please enter act number:')

  if (checkActNumber === actNumber) {
    setActs(acts.filter((item) => item._id !== _id))
    try {
      await axios.delete(`/acts/${registryId}/${_id}`)
    } catch (err) {
      console.error(err)
    }
  } else {
    alert('Wrong id')
  }
}
