import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useValidation } from '../validation/ActValidationContext'
import ActValidation from '../validation/ActValidation'

const ActItem = ({ act, editAct, deleteAct }) => {
  const [show, setShow] = useState(false)
  const [newAct, setNewAct] = useState({})
  const { errors, setErrors } = useValidation()

  const handleOpenModal = () => {
    setNewAct({ ...act })
    setShow(true)
  }

  const handleCloseModal = () => {
    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }
    setNewAct({})
    setErrors({})
    setShow(false)
  }
  const handleChange = (e) => {
    const { name, value } = e.target

    ActValidation(name, value)

    setNewAct((prevAct) => ({ ...prevAct, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }

    editAct(newAct)
      .then(handleCloseModal())
      .catch((error) => console.log(error))
  }

  return (
    <tr className='border-bottom p-3'>
      {Object.entries(act).map(([key, value], index) => {
        if (key === '_id' || key === 'registry' || key === '__v') return null
        return <td key={index}>{value}</td>
      })}

      <td>
        <Button variant='outline-warning' size='sm' onClick={handleOpenModal}>
          Edit
        </Button>

        <Modal show={show} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {Object.entries(act).map(([key, value], index) => {
                if (key === '_id' || key === 'registry' || key === '__v')
                  return null
                return (
                  <Form.Group
                    key={index}
                    className='mb-3'
                    controlId='exampleForm.ControlInput1'
                  >
                    <Form.Label>{key}</Form.Label>
                    <Form.Control
                      value={newAct[key]}
                      name={key}
                      onChange={handleChange}
                    />
                  </Form.Group>
                )
              })}
              <div className='d-flex justify-content-between'>
                <Button variant='secondary' onClick={handleCloseModal}>
                  Close
                </Button>
                <Button type='submit' variant='primary'>
                  Save Changes
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </td>
      <td>
        <div
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => deleteAct(act._id, act.actId, act.registry)}
        >
          x
        </div>
      </td>
    </tr>
  )
}

export default ActItem
