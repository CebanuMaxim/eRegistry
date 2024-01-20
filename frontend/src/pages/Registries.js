import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import moment from 'moment/moment'
import RegistryItem from '../components/RegistryItem'
import { AddRegistry } from '../components/AddRegistry'

const Registries = () => {
    const [registries, setRegistries] = useState([
        // {
        //     id: '0002152',
        //     nr: '4734',
        //     start: '01.01.2023',
        //     end: '31.03.2023'
        // },
        // {
        //     id: '0002153',
        //     nr: '4735',
        //     start: '01.04.2023',
        //     end: '31.06.2023'
        // },
        // {
        //     id: '0002154',
        //     nr: '4736',
        //     start: '01.07.2023',
        //     end: '31.09.2023'
        // },
        // {
        //     id: '0002155',
        //     nr: '4737',
        //     start: '01.10.2023',
        //     end: '...'
        // },
    ])


    useEffect(() => {
        async function getRegistries() {
            try {
                let registries = await axios.get('http://localhost:5000/api/registries/')
                registries = registries.data
                setRegistries(registries)
            } catch (error) {
                console.error(error)
            }
        }
        getRegistries()
    }, [])

    const addRegistry = () => {
        const registry = {}

        if (registries[registries.length - 1].end === '...') {
            registries[registries.length - 1].end = moment().format("DD.MM.YYYY")
        }

        // Problematique
        registry.typographyId = parseInt(registries[registries.length - 1].typographyId) + 1

        const nr = parseInt(registries[registries.length - 1].nr) + 1
        registry.nr = nr.toString()

        registry.startDate = moment().format("DD.MM.YYYY")
        registry.endDate = '...'

        setRegistries([...registries, registry])
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
        </>
    )
}

export default Registries