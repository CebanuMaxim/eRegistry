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
        let acts = await axios.get(
          `${process.env.REACT_APP_API_URL}/registries/${id}`
        )
        acts = acts.data.acts
        setActs(acts.reverse())
      } catch (error) {
        console.error(error)
      }
    }
    getActs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addAct = async (
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
    act.actName = actName
    act.firstname = firstname
    act.lastname = lastname
    act.idnp = idnp
    act.stateFee = stateFee
    act.notaryFee = notaryFee

    setActs([act, ...acts])
    await axios
      .post(`${process.env.REACT_APP_API_URL}/acts/${id}`, act)
      .then((res) => {
        console.log(res.data)
        showAlert(res.data.message, "success")
      })
      .catch((err) => {
        console.log(err)
        showAlert(err.response.data.message, "danger")
      })
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

    await axios
      .put(`${process.env.REACT_APP_API_URL}/acts/${_id}`, {
        actId,
        date,
        firstname,
        lastname,
        idnp,
        actName,
        stateFee,
        notaryFee,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const deleteAct = async (actId, actNumber, registryId) => {
    const checkActNumber = prompt("Please enter act number:")

    if (checkActNumber === actNumber.toString()) {
      setActs(acts.filter((item) => item._id !== actId))
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/acts/${registryId}/${actId}`
      )
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
                key={act.actId}
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
