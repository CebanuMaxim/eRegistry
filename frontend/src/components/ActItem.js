import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import inputValidation from '../validation/inputValidation'
import { errorStyle } from './Styles'

const ActItem = ({ act, editAct, deleteAct }) => {
  const [show, setShow] = useState(false)
  const [newAct, setNewAct] = useState({})
  const [errors, setErrors] = useState({})

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
    console.log('name, value: ', e.target)
    const { name, value } = e.target
    inputValidation(name, value, errors, setErrors)
    setNewAct((prevAct) => ({ ...prevAct, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }

    await editAct(newAct)
      .then(handleCloseModal())
      .catch((error) => console.log('error.response: ', error.response))
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
              {Object.keys(act).map((key, index) => {
                if (['_id', 'registry', '__v'].includes(key)) return null
                return (
                  <Form.Group
                    key={index}
                    className='mb-3'
                    controlId='exampleForm.ControlInput1'
                  >
                    <Form.Control
                      placeholder={key}
                      name={key}
                      value={newAct[key]}
                      onChange={handleChange}
                    />
                    {errors[key] && <div style={errorStyle}>{errors[key]}</div>}
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
