export interface SearchItemProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  actKey: string
  setActKey: React.Dispatch<React.SetStateAction<string>>
}
