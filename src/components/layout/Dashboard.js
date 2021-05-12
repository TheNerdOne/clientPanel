import React from 'react'
import Clients from '../clients/Clients'
import Sidebar from '../layout/Sidebar'
import {Row,Col} from 'react-bootstrap'

export default   () => {
    return (
        <Row>
            <Col md={10}>
                <Clients />
            </Col>
            <Col md={2}>
                <Sidebar />
            </Col>
        </Row>
    )
}
