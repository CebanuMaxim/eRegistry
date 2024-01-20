import React, { useState } from 'react'
import moment from 'moment/moment'
import { Table } from 'react-bootstrap'
import ActItem from '../components/ActItem'
import AddAct from '../components/AddAct'

const Acts = () => {
    const [acts, setActs] = useState([
        {
            id: '2-889',
            date: '18.03.2023',
            firstname: 'John',
            lastname: 'Doe',
            idnp: '2004003001820',
            act_name: 'Procura',
            state_fee: '10',
            notary_fee: '350',
        },
        {
            id: '2-890',
            date: '18.03.2023',
            firstname: 'John',
            lastname: 'Doe',
            idnp: '2004003001820',
            act_name: 'Procura',
            state_fee: '10',
            notary_fee: '350',
        },
        {
            id: '2-891',
            date: '18.03.2023',
            firstname: 'John',
            lastname: 'Doe',
            idnp: '2004003001820',
            act_name: 'Procura',
            state_fee: '10',
            notary_fee: '350',
        },
        {
            id: '2-892',
            date: '19.03.2023',
            firstname: 'John',
            lastname: 'Doe',
            idnp: '2004003001820',
            act_name: 'Procura',
            state_fee: '10',
            notary_fee: '350',
        },
        {
            id: '2-893',
            date: '19.03.2023',
            firstname: 'John',
            lastname: 'Doe',
            idnp: '2004003001820',
            act_name: 'Procura',
            state_fee: '10',
            notary_fee: '350',
        },
    ])

    const addAct = (firstname, lastname, idnp, actName, stateFee, notaryFee) => {
        const act = {}

        const lastActId = (acts[acts.length - 1].id).slice(2)
        const id = parseInt(lastActId) + 1
        act.id = '2-' + id.toString()

        act.date = moment().format("DD.MM.YYYY")
        act.firstname = firstname
        act.lastname = lastname
        act.idnp = idnp
        act.act_name = actName
        act.state_fee = stateFee
        act.notary_fee = notaryFee

        setActs([...acts, act])
    }

    function editAct(id, newFirstname, newLastname, newIdnp, newActName, newStateFee, newNotaryFee) {
        const act = acts.find((act) => act.id === id)

        if (newFirstname) act.firstname = newFirstname
        if (newLastname) act.lastname = newLastname
        if (newIdnp) act.end = newIdnp
        if (newActName) act.act_name = newActName
        if (newStateFee) act.state_fee = newStateFee
        if (newNotaryFee) act.notary_fee = newNotaryFee
    }

    function deleteAct(id) {
        const check = prompt("Please enter act id:")

        if (check === id) {
            setActs(acts.filter((item) => item.id !== id))
        } else {
            alert('Wrong id')
        }
    }

    return (
        <>
            <Table striped>
                <thead>
                    <tr className='border-bottom p-3 fw-bolder'>
                        <td>Act number</td>
                        <td>Date</td>
                        <td>Firstname</td>
                        <td>Lastname</td>
                        <td>IDNP</td>
                        <td>Act name</td>
                        <td>State fee</td>
                        <td>Notary fee</td>
                        <td></td>
                    </tr></thead>
                <tbody>
                    {
                        acts.map((act) => {
                            return (
                                <ActItem
                                    key={ act.id }
                                    act={ act }
                                    editAct={ editAct }
                                    deleteAct={ deleteAct }
                                />
                            )
                        })
                    }
                </tbody>
            </Table>
            <AddAct addAct={ addAct } />
        </>
    )
}

export default Acts