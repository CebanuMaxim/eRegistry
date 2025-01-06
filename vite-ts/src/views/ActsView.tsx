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

const Acts = () => {
  // Existing state variables
  const [acts, setActs] = useState<Act[]>([])
  const { setFilteredActs } = useContext(FilteredActsContext)
  const [typographyId, setTypographyId] = useState('')
  const [registryId, setRegistryId] = useState('')
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

        if (!res.data.acts) {
          return
        }
        setActs(
          res.data.acts
            .sort((a: Act, b: Act) => Number(a.date) - Number(b.date))
            .reverse()
        )
      } catch (err) {
        console.error(err)
      }
    }

    getActs()
  }, [id])

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

  // DO NOT DELETE !!!
  // const goToPage = (page: number) => {
  //   if (page >= 1 && page <= totalPages) setCurrentPage(page)
  // }

  // Service functions
  const addAct = (act: Act) => addActService(act, setActs, id as string)
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
            navigate(`/confirmations/${id}/${typographyId}/${registryId}`)
          }
        >
          Confirmări
        </Button>
      </div>
      <div style={{ height: '500px', overflowY: 'auto' }}>
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
              <td>Data</td>
              <td>Denumirea actului</td>
              <td>Nume</td>
              <td>Prenume</td>
              <td>IDNP/CNP</td>
              <td>Taxa de stat</td>
              <td>Taxa notarială</td>
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
        {/* {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? 'primary' : 'light'}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))} */}
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
