import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { dateFormatToMD } from '../utils/formatDateHandler'
import RegistrySchema from '../validation/RegistrySchema'

const RegistryItem = ({ registry, editRegistry, deleteRegistry }) => {
  const [show, setShow] = useState(false)

  const [newRegistry, setNewRegistry] = useState({
    typographyId: registry.typographyId,
    registryId: registry.registryId,
    startDate: registry.startDate,
    endDate: registry.endDate,
  })

  const [errors, setErrors] = useState({
    typographyId: '',
    registryId: '',
    startDate: '',
    endDate: '',
  })

  const handleClose = () => {
    setNewRegistry({
      typographyId: '',
      registryId: '',
      startDate: '',
      endDate: '',
    })
    setErrors({})

    setShow(false)
  }
  const handleShow = () => setShow(true)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewRegistry((prevRegistry) => ({ ...prevRegistry, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await RegistrySchema.validate(newRegistry, {
        abortEarly: false,
      })
      setErrors({})

      for (const [key, value] of Object.entries(newRegistry)) {
        if (value) registry[key] = value
      }

      await editRegistry(registry)
    } catch (validationErrors) {
      const allErrors = {}
      validationErrors.inner.forEach((error) => {
        allErrors[error.path] = error.message
      })
      setErrors(allErrors)
      console.log(errors)
      if (Object.keys(errors).length === 0) setShow(false)
    }
    // setNewRegistry({
    //   typographyId: '',
    //   registryId: '',
    //   startDate: '',
    //   endDate: '',
    // })
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
        <Button variant='outline-warning' size='sm' onClick={handleShow}>
          Edit
        </Button>

        <Modal show={show} onHide={handleClose}>
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
                <Button variant='secondary' onClick={handleClose}>
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
