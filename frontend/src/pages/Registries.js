import React, { useState, useEffect } from "react"
import axios from "axios"
import { Table, Alert } from "react-bootstrap"
import RegistryItem from "../components/RegistryItem"
import AddRegistry from "../components/AddRegistry"

const Registries = () => {
  const [registries, setRegistries] = useState([])
  const [regAlert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  })

  useEffect(() => {
    async function getRegistries() {
      try {
        let registries = await axios.get(
          `${process.env.REACT_APP_API_URL}/registries`
        )
        registries = registries.data

        setRegistries(registries)
      } catch (error) {
        console.error(error)
      }
    }
    getRegistries()
  }, [])

  const addRegistry = async (typographyId, registryId, startDate, endDate) => {
    if (typographyId === "" || registryId === "" || startDate === "") {
      showAlert("Please fill all the fields", "danger")
      return
    }
    if (endDate === "") {
      endDate = "--.--.----"
    }
    const registry = {}
    registry.typographyId = typographyId
    registry.registryId = registryId
    registry.startDate = startDate
    registry.endDate = endDate

    setRegistries([...registries, registry])

    await axios
      .post(`${process.env.REACT_APP_API_URL}/registries`, registry)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
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

  const editRegistry = async (
    _id,
    newTypographyId,
    newRegistryId,
    newStartDate,
    newEndDate
  ) => {
    const registry = registries.find((registry) => registry._id === _id)

    if (newTypographyId) registry.typographyId = newTypographyId
    if (newRegistryId) registry.registryId = newRegistryId
    if (newStartDate) registry.startDate = newStartDate
    if (newEndDate) registry.endDate = newEndDate

    const { typographyId, registryId, startDate, endDate } = registry

    await axios
      .put(`${process.env.REACT_APP_API_URL}/registries/${_id}`, {
        typographyId,
        registryId,
        startDate,
        endDate,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function deleteRegistry(_id, registryId) {
    const check = prompt("Please enter registry id:")
    if (check === registryId) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/registries/${_id}`)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })

      setRegistries((prevRegistries) =>
        prevRegistries.filter((item) => item._id !== _id)
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
            <td>Registry Number</td>
            <td>Start date</td>
            <td>End date</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {registries.map((registry) => {
            return (
              <RegistryItem
                key={registry.registryId}
                registry={registry}
                editRegistry={editRegistry}
                deleteRegistry={deleteRegistry}
              />
            )
          })}
        </tbody>
      </Table>
      <AddRegistry addRegistry={addRegistry} />
      {regAlert.show && (
        <Alert variant={regAlert.variant}>{regAlert.message}</Alert>
      )}
    </>
  )
}

export default Registries
