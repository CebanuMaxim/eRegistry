import React, { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

const RegistryItem = ({
  registry: { _id, typographyId, registryId, startDate, endDate },
  editRegistry,
  deleteRegistry,
}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [newTypographyId, setNewTypographyId] = useState("")
  const [newRegistryId, setNewRegistryId] = useState("")
  const [newStartDate, setNewStartDate] = useState("")
  const [newEndDate, setNewEndDate] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    editRegistry(_id, newTypographyId, newRegistryId, newStartDate, newEndDate)

    setNewTypographyId("")
    setNewRegistryId("")
    setNewStartDate("")
    setNewEndDate("")
  }

  return (
    <tr key={registryId} className="border-bottom p-3">
      <td>
        {typographyId} / {registryId}
      </td>
      <td>{startDate}</td>
      <td>{endDate}</td>
      <td>
        <Button variant="link" size="sm">
          <Link to={`/regisrtry/${_id}`}>Open</Link>
        </Button>
      </td>
      <td>
        <Button variant="outline-warning" size="sm" onClick={handleShow}>
          Edit
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Typography id</Form.Label>
                <Form.Control
                  onChange={(e) => setNewTypographyId(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Registry id</Form.Label>
                <Form.Control
                  onChange={(e) => setNewRegistryId(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Start date</Form.Label>
                <Form.Control
                  onChange={(e) => setNewStartDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>End date</Form.Label>
                <Form.Control onChange={(e) => setNewEndDate(e.target.value)} />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteRegistry(_id, registryId)}
                >
                  Delete
                </Button>
                <Button type="submit" variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </td>
    </tr>
  )
}

export default RegistryItem
