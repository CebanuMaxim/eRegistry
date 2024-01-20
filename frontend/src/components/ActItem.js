import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

const ActItem = ({
    act: { id, date, firstname, lastname, idnp, act_name, notary_fee, state_fee },
    editAct,
    deleteAct
}) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [newFirstname, setNewFirstname] = useState('')
    const [newLastname, setNewLastname] = useState('')
    const [newIdnp, setNewIdnp] = useState('')
    const [newActName, setNewActName] = useState('')
    const [newStateFee, setNewStateFee] = useState('')
    const [newNotaryFee, setNewNotaryFee] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        editAct(id, newFirstname, newLastname, newIdnp, newActName, newStateFee, newNotaryFee)

        setNewFirstname('')
        setNewLastname('')
        setNewIdnp('')
        setNewActName('')
        setNewStateFee('')
        setNewNotaryFee('')
    }

    return (
        <tr key={ id } className='border-bottom p-3'>
            <td>{ id }</td>
            <td>{ date }</td>
            <td>{ firstname }</td>
            <td>{ lastname }</td>
            <td>{ idnp }</td>
            <td>{ act_name }</td>
            <td>{ state_fee }</td>
            <td>{ notary_fee }</td>
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
                                <Form.Label>firstname</Form.Label>
                                <Form.Control
                                    placeholder='firstname'
                                    onChange={ e => setNewFirstname(e.target.value) }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>lastname</Form.Label>
                                <Form.Control
                                    placeholder='lastname'
                                    onChange={ e => setNewLastname(e.target.value) }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>IDNP</Form.Label>
                                <Form.Control
                                    placeholder='idnp'
                                    onChange={ e => setNewIdnp(e.target.value) }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>act name</Form.Label>
                                <Form.Control
                                    placeholder='act name'
                                    onChange={ e => setNewActName(e.target.value) }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>state fee</Form.Label>
                                <Form.Control
                                    placeholder='state fee'
                                    onChange={ e => setNewStateFee(e.target.value) }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>notary fee</Form.Label>
                                <Form.Control
                                    placeholder='notary fee'
                                    onChange={ e => setNewNotaryFee(e.target.value) }
                                />
                            </Form.Group>
                            <div className='d-flex justify-content-between'>
                                <Button variant="secondary" onClick={ handleClose }>
                                    Close
                                </Button>
                                <Button variant="danger" onClick={ () => deleteAct(id) }>
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

export default ActItem