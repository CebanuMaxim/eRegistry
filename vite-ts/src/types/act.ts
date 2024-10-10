import { Dispatch, SetStateAction } from 'react'

export interface Act {
  [key: string]: string | number | boolean | undefined
  actNumber: string
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
