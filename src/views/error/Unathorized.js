import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col
} from "reactstrap";

export default class Unauthorized extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <React.Fragment>
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent py-3 border-0">
                        <Row className="mb-4">
                            <Col lg="12" md="12" sm="12">
                                <h4>Not Authorized</h4>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <Row>
                            <Col lg="12" m="12">
                                <label>
                                    You are not authorized to view this page
                                </label>
                            </Col>
                        </Row>

                    </CardBody>
                </Card>
            </React.Fragment>
           )
    }
}