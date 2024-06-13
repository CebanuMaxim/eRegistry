import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import inputValidation from '../validation/inputValidation'
import { errorStyle } from './Styles'

const RegistryItem = ({ registry, editRegistry, deleteRegistry }) => {
  const [show, setShow] = useState(false)
  const [newRegistry, setNewRegistry] = useState({})
  const [errors, setErrors] = useState({
    typographyId: '',
    registryId: '',
    startDate: '',
    endDate: '',
  })

  const handleOpenModal = () => {
    setNewRegistry({ ...registry })
    setShow(true)
  }

  const handleCloseModal = () => {
    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }
    setNewRegistry({})
    setErrors({})
    setShow(false)
  }

  function isValidDateMoment(dateString) {
    // 'DD.MM.YYYY' specifies the expected date format
    return moment(dateString, 'DD.MM.YYYY', true).isValid()
  }

  const checkInput = (name, value, inputName, pattern, message) => {
    if (name === inputName && !pattern.test(value)) {
      if (
        (name === 'startDate' || name === 'endDate') &&
        !isValidDateMoment(value)
      ) {
        console.log('notValidDate')
      }
      setErrors((prevErrors) => ({ ...prevErrors, [inputName]: message }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [inputName]: '' }))
    }
  }

  const modalValidation = (name, value) => {
    switch (name) {
      case 'typographyId':
        checkInput(
          name,
          value,
          'typographyId',
          /^\d{7}$/,
          'typographyId must be 7-digits string'
        )
        break
      case 'registryId':
        checkInput(
          name,
          value,
          'registryId',
          /^\d{4}$/,
          'registryId must be 4-digits string'
        )
        break
      case 'startDate':
        checkInput(
          name,
          value,
          'startDate',
          /^\d{2}.\d{2}.\d{4}$/,
          'Invalid date format. Please use DD.MM.YYYY'
        )
        break
      case 'endDate':
        checkInput(
          name,
          value,
          'endDate',
          /^\d{2}.\d{2}.\d{4}$/,
          'Invalid date format. Please use DD.MM.YYYY'
        )
        break
      default:
        break
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    inputValidation(name, value, errors, setErrors)
    setNewRegistry((prevRegistry) => ({ ...prevRegistry, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }

    try {
      for (const [key, value] of Object.entries(newRegistry)) {
        if (value) registry[key] = value
      }
      await editRegistry(registry)
    } catch (err) {
      console.log(err)
    }
    handleCloseModal()
  }

  return (
    <tr key={registry.registryId} className='border-bottom p-3'>
      <td>
        {registry.typographyId} / {registry.registryId}
      </td>
      <td>{registry.startDate}</td>
      <td>{registry.endDate}</td>
      <td>
        <Button variant='link' size='sm'>
          <Link to={`/regisrtry/${registry._id}`}>Open</Link>
        </Button>
      </td>
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
              {Object.keys(registry).map((key, index) => {
                if (['acts', '_id', 'registry', '__v'].includes(key))
                  return null
                return (
                  <Form.Group
                    key={index}
                    className='mb-3'
                    controlId='exampleForm.ControlInput1'
                  >
                    <Form.Control
                      name={key}
                      value={newRegistry[key]}
                      onChange={handleChange}
                    />
                    {errors.typographyId && (
                      <div style={errorStyle}>{errors[key]}</div>
                    )}
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
          onClick={() => deleteRegistry(registry._id, registry.registryId)}
        >
          x
        </div>
      </td>
    </tr>
  )
}

export default RegistryItem
