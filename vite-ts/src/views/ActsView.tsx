import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import ActItem from '../components/ActItem'
import AddAct from '../components/AddAct'
import axios from '../api/axios'
import SearchItem from '../components/SearchItem'
import { FaSort } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { FilteredActsContext } from '../context/Context'

const Acts = () => {
  const [acts, setActs] = useState([])
  const { filteredActs, setFilteredActs } = useContext(FilteredActsContext)
  const [typographyId, setTypographyId] = useState('')
  const [registryId, setRegistryId] = useState('')
  const [search, setSearch] = useState('')
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
            .sort(function (a, b) {
              return a.actId - b.actId
            })
            .reverse()
        )
      } catch (err) {
        console.error(err)
      }
    }

    getActs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const filterActs = () => {
      const filtered = acts.filter((act) => {
        switch (actKey) {
          case 'date':
            return act.date.toString().toLowerCase().includes(search)
          case 'firstname':
            return act.firstname.toString().toLowerCase().includes(search)
          case 'lastname':
            return act.lastname.toString().toLowerCase().includes(search)
          case 'idnp':
            return act.idnp.toString().toLowerCase().includes(search)
          default:
            return act.actId.toString().includes(search)
        }
      })
      setFilteredActs(filtered)
    }

    filterActs()
    // eslint-disable-next-line
  }, [acts, search, actKey])

  const addAct = async (act) => {
    try {
      await axios.post(`/acts/${id}`, act)
      setActs((prevActs) => [act, ...prevActs])
    } catch (err) {
      console.log(err)
      toast.error(err.response.data)
    }
  }

  const editAct = async (updatedAct) => {
    const act = acts.find((act) => act._id === updatedAct._id)

    for (const [key, value] of Object.entries(updatedAct)) {
      if (value) act[key] = value
    }

    try {
      await axios.put(`/acts/${act._id}`, act)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteAct = async (actId, actNumber, registryId) => {
    const checkActNumber = prompt('Please enter act number:')

    if (checkActNumber === actNumber.toString()) {
      setActs(acts.filter((item) => item._id !== actId))
      try {
        await axios.delete(`/acts/${registryId}/${actId}`)
      } catch (err) {
        console.error(err)
      }
    } else {
      alert('Wrong id')
    }
  }

  const toggleSort = () => {
    setActs(
      acts.sort((a, b) => (toggle ? a.actId - b.actId : b.actId - a.actId))
    )
    setToggle(!toggle)
  }

  return (
    <>
      <AddAct addAct={addAct} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchItem
          search={search}
          setSearch={setSearch}
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
            {filteredActs.map((act, i) => {
              return (
                <ActItem
                  key={i}
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
