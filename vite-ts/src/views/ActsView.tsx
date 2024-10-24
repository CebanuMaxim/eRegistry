import { useState, useEffect, useContext } from 'react'
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
  console.log('params: ', id)
  let regId = ''

  useEffect(() => {
    async function getActs() {
      try {
        const res = await axios.get(`/registries/${id}`)
        console.log(res.data)

        setTypographyId(res.data.typographyId)
        setRegistryId(res.data.registryId)
        regId = res.data._id

        if (!res.data.acts) {
          return
        }
        setActs(
          res.data.acts
            .sort(function (a: Act, b: Act) {
              return Number(a.actId) - Number(b.actId)
            })
            .reverse()
        )
      } catch (err) {
        console.error(err)
      }
    }

    getActs()
  }, [id])

  useEffect(() => {
    const filterActs = () => {
      const filtered = acts.filter((act: Act) => {
        const compareBy = (property: string, searchTerm: string) => {
          return property
            .toString()
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
        }

        switch (actKey) {
          case 'date':
            return compareBy(act.date, searchTerm)
          case 'firstname':
            return compareBy(act.firstname, searchTerm)
          case 'lastname':
            return compareBy(act.lastname, searchTerm)
          case 'idnp':
            return compareBy(act.idnp, searchTerm)
          default:
            return compareBy(act.actId, searchTerm)
        }
      })
      setFilteredActs(filtered)
    }

    filterActs()
    // eslint-disable-next-line
  }, [acts, searchTerm, actKey])

  console.log(id, typeof id)
  console.log(regId, typeof regId)

  const addAct = (act: Act, id: string) => addActService(act, setActs, regId)
  const editAct = (updatedAct: Act) => editActService(updatedAct, acts)
  const deleteAct = async (
    _id: string,
    actNumber: string,
    registryId: string
  ) => deleteActService(_id, actNumber, registryId, acts, setActs)

  const toggleSort = () => {
    setActs(
      [...acts].sort((a, b) =>
        toggle
          ? Number(a.actId) - Number(b.actId)
          : Number(b.actId) - Number(a.actId)
      )
    )
    setToggle(!toggle)
  }

  return (
    <>
      <AddAct addAct={addAct} id={regId} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchItem
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          actKey={actKey}
          setActKey={setActKey}
        />
        <Button
          className='btn btn-light my-3'
          onClick={() => navigate(`/reports`)}
        >
          Rapoarte
        </Button>
        <Button
          className='btn btn-light my-3'
          onClick={() =>
            navigate(`/confirmations/${typographyId}/${registryId}`)
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
              <td>IDNP</td>
              <td>Taxa de stat</td>
              <td>Taxa notarială</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {filteredActs.map((act) => {
              return (
                <ActItem
                  key={act.actId}
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
