import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col
} from "reactstrap";

export default class InternalServerError extends React.Component {
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
                                <h4>Request Failure</h4>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <Row>
                            <Col lg="12" m="12">
                                <label>
                                    Request is not processes successfully
                                </label>
                            </Col>
                        </Row>

                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}