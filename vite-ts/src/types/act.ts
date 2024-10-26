import { Dispatch, SetStateAction } from 'react'

export interface Act {
  [key: string]: string | number | boolean | undefined
  actId: string
  date: string
  actName: string
  firstname: string
  lastname: string
  idnp: string
  stateFee: number
  notaryFee: number
  registry: string
  _id: string
}

export interface FilteredActsContextType {
  filteredActs: Act[]
  setFilteredActs: Dispatch<SetStateAction<Act[]>>
}

export interface ActItemProps {
  act: Act
  editAct: (act: Act) => Promise<void>
  deleteAct: (_id: string, actNumber: string, registryId: string) => void
}

export interface AddActProps {
  addAct: (act: Act) => Promise<void>
}

export interface ActValidationContextType {
  act: Act
  setAct: Dispatch<SetStateAction<Act>>
  errors: Record<string, string>
  setErrors: Dispatch<SetStateAction<Record<string, string>>>
}