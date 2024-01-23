import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Table, Alert } from "react-bootstrap"
import ActItem from "../components/ActItem"
import AddAct from "../components/AddAct"
import axios from "axios"

const Acts = () => {
  const [acts, setActs] = useState([])
  const [regAlert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  })
  const { id } = useParams()

  useEffect(() => {
    async function getActs() {
      try {
        let acts = await axios.get(`http://localhost:5000/api/registries/${id}`)
        acts = acts.data.acts
        setActs(acts)
      } catch (error) {
        console.error(error)
      }
    }
    getActs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addAct = (
    actId,
    date,
    firstname,
    lastname,
    idnp,
    actName,
    stateFee,
    notaryFee
  ) => {
    if (
      actId === "" ||
      date === "" ||
      firstname === "" ||
      lastname === "" ||
      idnp === "" ||
      actName === "" ||
      stateFee === "" ||
      notaryFee === ""
    ) {
      showAlert("Please fill all the fields", "danger")
      return
    }

    const act = {}

    act.actId = actId
    act.date = date
    act.firstname = firstname
    act.lastname = lastname
    act.idnp = idnp
    act.act_name = actName
    act.state_fee = stateFee
    act.notary_fee = notaryFee

    setActs([...acts, act])
  }

  function showAlert(message, variant = "success", seconds = 1000) {
    setAlert({
      show: true,
      message,
      variant,
    })

    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        variant: "success",
      })
    }, seconds)
  }

  const editAct = (
    id,
    newFirstname,
    newLastname,
    newIdnp,
    newActName,
    newStateFee,
    newNotaryFee
  ) => {
    const act = acts.find((act) => act.id === id)

    if (newFirstname) act.firstname = newFirstname
    if (newLastname) act.lastname = newLastname
    if (newIdnp) act.end = newIdnp
    if (newActName) act.act_name = newActName
    if (newStateFee) act.state_fee = newStateFee
    if (newNotaryFee) act.notary_fee = newNotaryFee
  }

  const deleteAct = (id) => {
    const check = prompt("Please enter act id:")

    if (check === id) {
      setActs(acts.filter((item) => item.id !== id))
    } else {
      alert("Wrong id")
    }
  }

  return (
    <>
      <Table striped>
        <thead>
          <tr className="border-bottom p-3 fw-bolder">
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
          {acts.map((act) => {
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
      <AddAct addAct={addAct} />
      {regAlert.show && (
        <Alert variant={regAlert.variant}>{regAlert.message}</Alert>
      )}
    </>
  )
}

export default Acts
