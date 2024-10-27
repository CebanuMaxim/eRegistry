import { Dispatch, SetStateAction } from 'react'

export interface Registry {
  typographyId: string
  registryId: string
  startDate: string
  [key: string]: string
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

export interface RegistryItemProps {
  registry: Registry
  editRegistry: (registry: Registry) => Promise<void>
  deleteRegistry: (_id: string, registryId: string) => Promise<void>
}
