import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import resetValidators from './reset-validation';
import axios from "axios";
import service from '../../services';

let accessToken; 
class ForgotPassword extends React.Component {
    constructor() {
        super()
        this.state = {
            userInfo: {
                email: '',
                showOnSubmit:false
            },
            errorMsg:''
        }
        this.resetValidators = resetValidators;
    }

    displayErrorBorder = (fieldName) => {
        return !this.resetValidators[fieldName].valid && this.resetValidators[fieldName].errors.length > 0 ? "has-danger" : '';
    };

    displayValidationErrors=(fieldName)=> {
        const validator = this.resetValidators[fieldName];
        const result = '';
        if (validator && !validator.valid) {
            const errors = validator.errors.map((info, index) => {
                return <span className="error" key={index}>* {info}</span>;
            });

            return (
                <div className="col s12 row">
                    {errors}
                </div>
            );
        }
        return result;
    }

    isFormValid=()=> {
        let status = true;
        Object.keys(this.resetValidators).forEach((field) => {
            if (!this.resetValidators[field].valid) {
                status = false;
            }
        });
        return status;
    }

    updateValidators=(fieldName, value)=> {
        if (this.resetValidators[fieldName] == undefined) return;
        this.resetValidators[fieldName].errors = [];
        this.resetValidators[fieldName].state = value;
        this.resetValidators[fieldName].valid = true;
        this.resetValidators[fieldName].rules.forEach((rule) => {
            if (rule.test instanceof RegExp) {
                if (!rule.test.test(value)) {
                    this.resetValidators[fieldName].errors.push(rule.message);
                    this.resetValidators[fieldName].valid = false;
                }
            } 
        });
    }

    handleInputChange=(event, inputPropName)=> {
        const newState = Object.assign({}, this.state);
        if (event.target) {
            newState.userInfo[inputPropName] = event.target.value;
            this.updateValidators(inputPropName, event.target.value);
        }
        this.setState(newState);
    }

    sendOtp = () => {
        accessToken = localStorage.accessToken;
        let newState = Object.assign({}, this.state);
        var isUserFormValid = this.isFormValid();
        const { userInfo } = this.state;
        if (!isUserFormValid) {
            newState.userInfo.showOnSubmit = true;
            this.updateValidators("email", userInfo.email);
            this.setState(newState);
            return;
        }
        axios({
            method: 'GET',
            url: service.baseAPIURL + 'Users/SendOtpForPasswordRecovery?email=' + newState.userInfo.email
        })
            .then(response => {
                if (response.data.result.status) {
                    window.location = '/#/auth/resetpassword';
                }
                else {
                    newState.errorMsg = response.data.result.statusMessage;
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (<>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent py-4">
                        <div className="text-muted text-center">
                            <h3 className="mb-0">Forgot Password</h3>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center">
                            <h4 className="text-danger">{this.state.errorMsg}</h4>
                        </div>
                        <Form role="form">
                            <Row className="mb-3">
                                <Col md="12" className={this.displayErrorBorder("email")}>
                                    <Input type="text" placeholder="Enter email" onChange={(e) => this.handleInputChange(e, "email")} />
                                    {this.displayValidationErrors('email')}
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md="12">
                                <Button color="primary" size="sm" type="button" onClick={this.sendOtp}>Send</Button>
                                <Button className="ml-auto" color="primary" size="sm" type="button" onClick={() => { window.location='/#/auth/login' }}>Sign in</Button>
                            </Col>

                        </Row>
                    </CardFooter>
                </Card>
                <Row className="mt-1">
                   
                </Row>
            </Col>
           
        </>)
    }
}

export default ForgotPassword;