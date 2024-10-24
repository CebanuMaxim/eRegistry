import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import inputValidation from '../validation/inputValidation'
import { errorStyle } from './Styles'
import { Act, ActItemProps } from '../types'

const ActItem: React.FC<ActItemProps> = ({ act, editAct, deleteAct }) => {
  const [show, setShow] = useState(false)
  const [newAct, setNewAct] = useState<Act>({ ...act })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleOpenModal = () => {
    setNewAct({ ...act })
    setShow(true)
  }

  const handleCloseModal = () => {
    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }
    setNewAct(act)
    setErrors({})
    setShow(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    inputValidation(name, value, errors, setErrors)
    setNewAct((prevAct) => ({ ...prevAct, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }

    await editAct(newAct)
      .then(handleCloseModal)
      .catch((error) => console.log('error.response: ', error.response))
  }

  return (
    <tr className='border-bottom p-3'>
      {Object.entries(act).map(([key, value], index) => {
        if (['_id', 'registry', '__v'].includes(key)) return null

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
            <Form onSubmit={onSubmit}>
              {Object.keys(act).map((key, index) => {
                if (['_id', 'registry', '__v'].includes(key)) return null
                return (
                  <Form.Group
                    key={index}
                    className='mb-3'
                    controlId='exampleForm.ControlInput1'
                  >
                    <Form.Control
                      name={key}
                      value={
                        typeof newAct[key] === 'boolean'
                          ? String(newAct[key])
                          : newAct[key] || ''
                      }
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
          onClick={() => deleteAct(act.actId, act._id, act.registry)}
        >
          x
        </div>
      </td>
    </tr>
  )
}

export default ActItem
