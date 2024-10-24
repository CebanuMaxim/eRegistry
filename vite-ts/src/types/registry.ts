// import { Dispatch, SetStateAction } from 'react'

import { Dispatch, SetStateAction } from 'react'

export interface Registry {
  typographyId: string
  registryId: string
  startDate: string
  [key: string]: string | number | boolean | undefined
}

export interface RegistryValidationContextType {
  registry: Registry
  setRegistry: Dispatch<SetStateAction<Registry>>
  errors: Record<string, string>
  setErrors: Dispatch<SetStateAction<Record<string, string>>>
}

export interface AddRegistryProps {
  addRegistry: (registry: Registry) => Promise<void>
}
