import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const AddAct = ({ addAct }) => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [idnp, setIdnp] = useState('')
    const [actName, setActName] = useState('')
    const [stateFee, setStateFee] = useState('')
    const [notaryFee, setNotaryFee] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        addAct(firstname, lastname, idnp, actName, stateFee, notaryFee)

        setFirstname('')
        setLastname('')
        setIdnp('')
        setActName('')
        setStateFee('')
        setNotaryFee('')
    }

    return (
        <Card className='mt-5 mb-3'>
            <Card.Body>
                <Form onSubmit={ onSubmit }>
                    <Row className='my-3'>
                        <Col>
                            <Form.Control
                                placeholder='firstname'
                                value={ firstname }
                                onChange={ e => setFirstname(e.target.value) }
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder='lastname'
                                value={ lastname }
                                onChange={ e => setLastname(e.target.value) }
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder='idnp'
                                value={ idnp }
                                onChange={ e => setIdnp(e.target.value) }
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                as='select'
                                value={ actName }
                                onChange={ e => setActName(e.target.value) }
                            >
                                <option value='0'>Select act</option>
                                <option value='low'>Procura</option>
                                <option value='moderate'>Declaratie. Multiple plecari.</option>
                                <option value='high'>Declaratie. Regim matrimonial</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder='state fee'
                                value={ stateFee }
                                onChange={ e => setStateFee(e.target.value) }
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder='notary fee'
                                value={ notaryFee }
                                onChange={ e => setNotaryFee(e.target.value) }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-grid">
                            <Button type='submit' variant='secondary'>Add act</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddAct