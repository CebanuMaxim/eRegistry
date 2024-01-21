import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Alert } from 'react-bootstrap'
import RegistryItem from '../components/RegistryItem'
import AddRegistry from '../components/AddRegistry'

const Registries = () => {
    const [registries, setRegistries] = useState([])
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        variant: 'success'
    })


    useEffect(() => {
        async function getRegistries() {
            try {
                let registries = await axios.get('http://localhost:5000/api/registries')
                registries = registries.data
                setRegistries(registries)
            } catch (error) {
                console.error(error)
            }
        }
        getRegistries()
    }, [])

    const addRegistry = async (registry) => {
        if (
            registry.typographyId === '' ||
            registry.registryId === '' ||
            registry.startDate === '' ||
            registry.endDate === ''
        ) {
            showAlert('Please fill all the fields', 'danger')
            return
        }
        setRegistries([...registries, registry])
        console.log(registry)
        await axios.post('http://localhost:5000/api/registries', { registry })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })

    }

    function showAlert(message, variant = 'success', seconds = 1000) {
        setAlert({
            show: true,
            message,
            variant
        })

        setTimeout(() => {
            setAlert({
                show: false,
                message: '',
                variant: 'success'
            })
        }, seconds)
    }

    function editRegistry(id, newId, newStart, newEnd) {
        const registry = registries.find((registry) => registry.id === id)

        if (newId) registry.id = '0000' + newId.toString()
        if (newStart) registry.start = newStart.toString()
        if (newEnd) registry.end = newEnd.toString()
    }

    function deleteRegistry(id) {
        const check = prompt("Please enter registry id:")

        if (check === id) {
            setRegistries(registries.filter((item) => item.id !== id))
        } else {
            alert('Wrong id')
        }
    }


    return (
        <>
            <Table striped>
                <thead>
                    <tr className='border-bottom p-3 fw-bolder'>
                        <td>Registry Number</td>
                        <td>Start date</td>
                        <td>End date</td>
                        <td></td>
                        <td></td>
                    </tr></thead>
                <tbody>
                    {
                        registries.map((registry) => {
                            return (
                                <RegistryItem
                                    key={ registry.registryId }
                                    registry={ registry }
                                    editRegistry={ editRegistry }
                                    deleteRegistry={ deleteRegistry }
                                />
                            )
                        })
                    }
                </tbody>
            </Table>
            <AddRegistry addRegistry={ addRegistry } />
            { alert.show && <Alert variant={ alert.variant }>{ alert.message }</Alert> }
        </>
    )
}

export default Registries