import React from 'react'
import { Button } from 'react-bootstrap'


export const AddRegistry = ({ addRegistry }) => {

    return (
        <Button variant="outline-primary" onClick={ addRegistry }>
            Add Registry
        </Button>
    )
}
