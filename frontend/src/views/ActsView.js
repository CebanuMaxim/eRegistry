import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import ActItem from '../components/ActItem'
import AddAct from '../components/AddAct'
import axios from '../api/axios'
import { toast } from 'react-toastify'
import SearchItem from '../components/SearchItem'

const Acts = () => {
  const [acts, setActs] = useState([])
  const [search, setSearch] = useState('')
  const [actKey, setActKey] = useState('')
  console.log(actKey)

  const { id } = useParams()

  useEffect(() => {
    async function getActs() {
      try {
        const res = await axios.get(`/registries/${id}`)
        if (!res.data.acts) {
          toast.error('No acts in this registry', 'danger')
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

  const addAct = async (act) => {
    setActs([act, ...acts])
    try {
      await axios.post(`/acts/${id}`, act)
    } catch (err) {
      console.error(err)
    }
  }

  const editAct = async (
    _id,
    newActId,
    newDate,
    newFirstname,
    newLastname,
    newIdnp,
    newActName,
    newStateFee,
    newNotaryFee
  ) => {
    const act = acts.find((act) => act._id === _id)

    if (newActId) act.actId = newActId
    if (newDate) act.date = newDate
    if (newFirstname) act.firstname = newFirstname
    if (newLastname) act.lastname = newLastname
    if (newIdnp) act.idnp = newIdnp
    if (newActName) act.actName = newActName
    if (newStateFee) act.stateFee = newStateFee
    if (newNotaryFee) act.notaryFee = newNotaryFee

    const {
      actId,
      date,
      firstname,
      lastname,
      idnp,
      actName,
      stateFee,
      notaryFee,
    } = act

    try {
      await axios.put(`/acts/${_id}`, {
        actId,
        date,
        firstname,
        lastname,
        idnp,
        actName,
        stateFee,
        notaryFee,
      })
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
  return (
    <>
      <AddAct addAct={addAct} />
      <SearchItem
        search={search}
        setSearch={setSearch}
        actKey={actKey}
        setActKey={setActKey}
      />
      <Table striped>
        <thead>
          <tr className='border-bottom p-3 fw-bolder'>
            <td>Act number</td>
            <td>Date</td>
            <td>Firstname</td>
            <td>Lastname</td>
            <td>IDNP</td>
            <td>Act name</td>
            <td>State fee</td>
            <td>Notary fee</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {acts
            .filter((act, i) => {
              switch (actKey) {
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
            .map((act, i) => {
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
    </>
  )
}

export default Acts
