// import { Dispatch, SetStateAction } from 'react'

export interface Registry {
  typographyId: string
  registryId: string
  startDate: string
  [key: string]: string | number | boolean | undefined
}

// export interface FilteredActsContextType {
//   filteredActs: Act[]
//   setFilteredActs: Dispatch<SetStateAction<Act[]>>
// }

// export interface ActItemProps {
//   act: Act
//   editAct: (act: Act) => Promise<void>
//   deleteAct: (_id: string, actNumber: string, registryId: string) => void
// }
