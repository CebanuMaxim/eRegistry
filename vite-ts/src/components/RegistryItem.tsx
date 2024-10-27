import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import inputValidation from '../validation/inputValidation'
import { errorStyle } from './Styles'
import { RegistryItemProps } from '../types'

const RegistryItem: React.FC<RegistryItemProps> = ({
  registry,
  editRegistry,
  deleteRegistry,
}) => {
  const [show, setShow] = useState(false)
  const [newRegistry, setNewRegistry] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    inputValidation(name, value, errors, setErrors)
    setNewRegistry((prevRegistry) => ({ ...prevRegistry, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
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
                      value={newRegistry[key] || ''}
                      onChange={onInputChange}
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
