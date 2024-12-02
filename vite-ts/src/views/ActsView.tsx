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
  const [acts, setActs] = useState<Act[]>([])
  const { filteredActs, setFilteredActs } = useContext(FilteredActsContext)
  const [typographyId, setTypographyId] = useState('')
  const [registryId, setRegistryId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [actKey, setActKey] = useState('')
  const [toggle, setToggle] = useState(true)

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
            .sort((a: Act, b: Act) => Number(a.actId) - Number(b.actId))
            .reverse()
        )
      } catch (err) {
        console.error(err)
      }
    }

    getActs()
  }, [id])

  const filteredActsMemo = useMemo(() => {
    return acts.filter((act: Act) => {
      const compare = (property: string, searchTerm: string) => {
        return property
          .toString()
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      }

      switch (actKey) {
        case 'date':
          return compare(act.date, searchTerm)
        case 'firstname':
          return compare(act.firstname, searchTerm)
        case 'lastname':
          return compare(act.lastname, searchTerm)
        case 'idnp':
          return compare(act.idnp, searchTerm)
        default:
          return compare(act.actId, searchTerm)
      }
    })
  }, [acts, searchTerm, actKey])

  useEffect(() => {
    setFilteredActs(filteredActsMemo)
  }, [filteredActsMemo, setFilteredActs])

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
          onClick={() => navigate(`/reports/${id}`)}
        >
          Rapoarte
        </Button>
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
        <Table striped style={{ overflowY: 'auto' }}>
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
            {filteredActs.map((act) => {
              return (
                <ActItem
                  key={act._id}
                  act={act}
                  editAct={editAct}
                  deleteAct={deleteAct}
                />
              )
            })}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Acts
