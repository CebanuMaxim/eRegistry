import axiosAPI from '../api/axios'
import { Act } from '../types'
import { toast } from 'react-toastify'
import axios from 'axios'

export const addActService = async (
  act: Act,
  setActs: React.Dispatch<React.SetStateAction<Act[]>>,
  id: string,
  navigate: (path: string) => void
) => {
  try {
    const res = await axiosAPI.post(`/acts/${id}`, act)
    setActs((prevActs) => [res.data, ...prevActs])
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data?.message)
      alert(err.response?.data?.message)
      toast.error(err.response?.data?.message)
    } else {
      console.error('Unexpected error', err)
    }

    // Navigate to '/' after handling the error
    navigate('/')
  }
}

export const editActService = async (updatedAct: Act, acts: Act[]) => {
  const act = acts.find((act) => act._id === updatedAct._id)

  if (!act) {
    console.error('Act not found')
    return
  }

  for (const [key, value] of Object.entries(updatedAct)) {
    if (value) (act as Act)[key] = value
  }

  try {
    await axios.put(`/acts/${act._id}`, act)
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('Axios error:', err.response?.data?.message)
    } else {
      console.error('Unexpected error:', err)
    }
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
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('Axios error:', err.response?.data?.message)
      } else {
        console.error('Unexpected error:', err)
      }
    }
  } else {
    alert('Wrong id')
  }
}
