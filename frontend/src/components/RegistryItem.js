import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { dateFormatToMD } from '../utils/formatDateHandler'
const moment = require('moment')

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
    setNewRegistry({
      typographyId: registry.typographyId,
      registryId: registry.registryId,
      startDate: registry.startDate,
      endDate: registry.endDate,
    })
    setShow(true)
  }
  const handleCloseModal = () => {
    if (!Object.values(errors).every((value) => value === '')) {
      alert(Object.values(errors).join('\n'))
      return
    }
    setNewRegistry({
      typographyId: '',
      registryId: '',
      startDate: '',
      endDate: '',
    })
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

    modalValidation(name, value)

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

  if (/^\d{4}-\d{2}-\d{2}$/.test(registry.startDate)) {
    registry.startDate = dateFormatToMD(registry.startDate)
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(registry.endDate)) {
    registry.endDate = dateFormatToMD(registry.endDate)
  }

  const errorStyle = {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '0.25rem',
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
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>Typography id</Form.Label>
                <Form.Control
                  placeholder={registry.typographyId}
                  name='typographyId'
                  value={newRegistry.typographyId}
                  onChange={handleChange}
                />
                {errors.typographyId && (
                  <div style={errorStyle}>{errors.typographyId}</div>
                )}
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>Registry id</Form.Label>
                <Form.Control
                  placeholder={registry.registryId}
                  name='registryId'
                  value={newRegistry.registryId}
                  onChange={handleChange}
                />
                {errors.registryId && (
                  <div style={errorStyle}>{errors.registryId}</div>
                )}
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>Start date</Form.Label>
                <Form.Control
                  placeholder={registry.startDate}
                  name='startDate'
                  value={newRegistry.startDate}
                  onChange={handleChange}
                />
                {errors.startDate && (
                  <div style={errorStyle}>{errors.startDate}</div>
                )}
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Form.Label>End date</Form.Label>
                <Form.Control
                  placeholder={registry.endDate}
                  name='endDate'
                  value={newRegistry.endDate}
                  onChange={handleChange}
                />
                {errors.endDate && (
                  <div style={errorStyle}>{errors.endDate}</div>
                )}
              </Form.Group>
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
