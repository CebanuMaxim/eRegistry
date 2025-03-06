import { useState, useEffect, useContext, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import ActItem from '../components/ActItem'
import AddAct from '../components/AddAct'
import axios from '../api/axios'
import SearchItem from '../components/SearchItem'
import { FaSort } from 'react-icons/fa'
import { FilteredActsContext } from '../context/Context'
import { Act } from '../types'
import {
  addActService,
  deleteActService,
  editActService,
} from '../services/actServices'
import { isAxiosError } from 'axios'

const Acts = () => {
  const [acts, setActs] = useState<Act[]>([])
  const { setFilteredActs } = useContext(FilteredActsContext)
  const [typographyId, setTypographyId] = useState('')
  const [registryId, setRegistryId] = useState('')
  const [registryIndex, setRegistryIndex] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [actKey, setActKey] = useState('')
  const [toggle, setToggle] = useState(true)

  // Pagination state variables
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9 // You can adjust this number as needed

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function getActs() {
      try {
        const res = await axios.get(`/registries/${id}`)

        setTypographyId(res.data.typographyId)
        setRegistryId(res.data.registryId)
        setRegistryIndex(res.data.registryIndex)

        if (!res.data.acts) {
          return
        }
        setActs(
          res.data.acts
            .sort((a: Act, b: Act) => {
              // a.date and b.date are "dd.mm.yyyy" strings
              const [dayA, monthA, yearA] = a.date.split('.')
              const [dayB, monthB, yearB] = b.date.split('.')

              // Create actual date objects (month is 0-indexed)
              const dateA = new Date(+yearA, +monthA - 1, +dayA)
              const dateB = new Date(+yearB, +monthB - 1, +dayB)

              // Compare timestamps
              return dateA.getTime() - dateB.getTime()
            })
            .reverse()
        )
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          console.log('ERROR! ActsView.65: ', err.response?.data?.message)
          alert(err.response?.data?.message || 'An unknown error occurred.')
          await axios.post('/users/logout')
          localStorage.clear()
          navigate('/')
        } else {
          console.log('Unexpected error: ', err)
          alert('An unexpected error occurred.')
        }
      }
    }

    getActs()
  }, [id, navigate])

  // Memoized filtered acts based on search term and actKey
  const filteredActsMemo = useMemo(() => {
    return acts.filter((act: Act) => {
      const compare = (property: string, searchTerm: string) => {
        return property
          .toString()
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      }

      switch (actKey) {
        case 'actId':
          return compare(act.actId, searchTerm)
        case 'firstname':
          return compare(act.firstname, searchTerm)
        case 'lastname':
          return compare(act.lastname, searchTerm)
        case 'idnp':
          return compare(act.idnp, searchTerm)
        default:
          return compare(act.date, searchTerm)
      }
    })
  }, [acts, searchTerm, actKey])

  useEffect(() => {
    setFilteredActs(filteredActsMemo)
    setCurrentPage(1) // Reset to first page when filters change
  }, [filteredActsMemo, setFilteredActs])

  // Sorting logic
  const sortedActs = useMemo(() => {
    return [...acts].sort((a, b) =>
      toggle
        ? Number(a.actId) - Number(b.actId)
        : Number(b.actId) - Number(a.actId)
    )
  }, [acts, toggle])

  const toggleSort = () => {
    setActs(sortedActs)
    setToggle(!toggle)
  }

  // Pagination calculations
  const totalPages = useMemo(() => {
    return Math.ceil(filteredActsMemo.length / itemsPerPage)
  }, [filteredActsMemo.length, itemsPerPage])

  const paginatedActs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredActsMemo.slice(startIndex, endIndex)
  }, [filteredActsMemo, currentPage, itemsPerPage])

  // Pagination control functions
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1)
  }

  // Service functions
  const addAct = (act: Act) =>
    addActService(act, setActs, id as string, navigate)
  const editAct = (updatedAct: Act) => editActService(updatedAct, acts)
  const deleteAct = (_id: string, actNumber: string, registryId: string) =>
    deleteActService(_id, actNumber, registryId, acts, setActs)

  return (
    <>
      <AddAct addAct={addAct} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchItem
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          actKey={actKey}
          setActKey={setActKey}
        />
        <Button
          className='btn btn-light my-3'
          onClick={() =>
            navigate(
              `/confirmations/${id}/${typographyId}/${registryId}/${registryIndex}`
            )
          }
        >
          Confirmări
        </Button>
      </div>
      <div>
        <Table striped>
          <thead>
            <tr className='border-bottom p-3 fw-bolder'>
              <td>
                Nr. actului
                <FaSort
                  style={{ cursor: 'pointer', marginLeft: '5px' }}
                  onClick={toggleSort}
                />
              </td>
              <td>Nume</td>
              <td>Prenume</td>
              <td>IDNP/CNP</td>
              <td>Denumirea actului</td>
              <td>Taxa de stat</td>
              <td>Taxa notarială</td>
              <td>Data</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {paginatedActs.map((act) => (
              <ActItem
                key={act._id}
                act={act}
                editAct={editAct}
                deleteAct={deleteAct}
              />
            ))}
          </tbody>
        </Table>
      </div>
      {/* Pagination Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: '10px',
        }}
      >
        <Button
          className='btn btn-secondary my-3'
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          <strong>&lt;</strong>
        </Button>
        <Button
          className='btn btn-secondary my-3'
          disabled={currentPage === totalPages}
          onClick={nextPage}
        >
          <strong>&gt;</strong>
        </Button>
      </div>
    </>
  )
}

export default Acts
