import React, { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"

const ActItem = ({
  act: {
    _id,
    actId,
    date,
    firstname,
    lastname,
    idnp,
    actName,
    notaryFee,
    stateFee,
  },
  editAct,
  deleteAct,
}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [newActId, setNewActId] = useState("")
  const [newDate, setNewDate] = useState("")
  const [newFirstname, setNewFirstname] = useState("")
  const [newLastname, setNewLastname] = useState("")
  const [newIdnp, setNewIdnp] = useState("")
  const [newActName, setNewActName] = useState("")
  const [newStateFee, setNewStateFee] = useState("")
  const [newNotaryFee, setNewNotaryFee] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    editAct(
      _id,
      newActId,
      newDate,
      newFirstname,
      newLastname,
      newIdnp,
      newActName,
      newStateFee,
      newNotaryFee
    )

    setNewActId("")
    setNewDate("")
    setNewFirstname("")
    setNewLastname("")
    setNewIdnp("")
    setNewActName("")
    setNewStateFee("")
    setNewNotaryFee("")
  }

  return (
    <tr key={_id} className="border-bottom p-3">
      <td>{actId}</td>
      <td>{date}</td>
      <td>{firstname}</td>
      <td>{lastname}</td>
      <td>{idnp}</td>
      <td>{actName}</td>
      <td>{stateFee}</td>
      <td>{notaryFee}</td>
      <td>
        <Button variant="link" size="sm" onClick={handleShow}>
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
                <Form.Label>Act Id</Form.Label>
                <Form.Control
                  onChange={(e) => setNewActId(e.target.value)}
                  value={actId}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Date</Form.Label>
                <Form.Control
                  onChange={(e) => setNewDate(e.target.value)}
                  value={date}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>firstname</Form.Label>
                <Form.Control
                  onChange={(e) => setNewFirstname(e.target.value)}
                  value={firstname}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>lastname</Form.Label>
                <Form.Control
                  placeholder="lastname"
                  onChange={(e) => setNewLastname(e.target.value)}
                  value={lastname}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>IDNP</Form.Label>
                <Form.Control
                  placeholder="idnp"
                  onChange={(e) => setNewIdnp(e.target.value)}
                  value={idnp}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>act name</Form.Label>
                <Form.Control
                  onChange={(e) => setNewActName(e.target.value)}
                  value={actName}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>state fee</Form.Label>
                <Form.Control
                  onChange={(e) => setNewStateFee(e.target.value)}
                  value={stateFee}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>notary fee</Form.Label>
                <Form.Control
                  onChange={(e) => setNewNotaryFee(e.target.value)}
                  value={notaryFee}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={() => deleteAct(_id, actId)}>
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

export default ActItem
