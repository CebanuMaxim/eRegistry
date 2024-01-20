import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RegistryItem = ({
    registry: { typographyId, registryId, startDate },
    editRegistry,
    deleteRegistry
}) => {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [newId, setNewId] = useState('')
    const [newStart, setNewStart] = useState('')
    const [newEnd, setNewEnd] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        editRegistry(newId, newStart, newEnd)

        setNewId('')
        setNewStart('')
        setNewEnd('')
    }

    return (
        <tr key={ registryId } className='border-bottom p-3'>
            <td>{ typographyId } / { registryId }</td>
            <td>{ startDate }</td>
            <td>
                <Button variant="link" size='sm' >
                    <Link to={ `/regisrtry/${registryId}` }>Open</Link>
                </Button>
            </td>
            <td>
                <Button variant="link" size='sm' onClick={ handleShow }>
                    Edit
                </Button>

                <Modal show={ show } onHide={ handleClose }>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={ onSubmit }>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Registry id</Form.Label>
                                <Form.Control
                                    placeholder='id'
                                    onChange={ e => setNewId(e.target.value) }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Start date</Form.Label>
                                <Form.Control
                                    placeholder='start'
                                    onChange={ e => setNewStart(e.target.value) }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>End date</Form.Label>
                                <Form.Control
                                    placeholder='end'
                                    onChange={ e => setNewEnd(e.target.value) }
                                />
                            </Form.Group>
                            <div className='d-flex justify-content-between'>
                                <Button variant="secondary" onClick={ handleClose }>
                                    Close
                                </Button>
                                <Button variant="danger" onClick={ () => deleteRegistry(registryId) }>
                                    Delete
                                </Button>
                                <Button type="submit" variant="primary" onClick={ handleClose }>
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