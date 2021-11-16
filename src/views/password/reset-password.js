import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Progress,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import passwordValidators from './password-validation';
import axios from "axios";
import service from '../../services';
import { strengthIndicator, strengthColor } from '../../components/password-strength/strength-checker';


let accessToken;
class ResetPassword extends React.Component {
    constructor() {
        super()
        this.state = {
            userInfo: {
                password: '',
                retypePassword: '',
                showOnSubmit: false,
                otp: ''
            },
            errorMsg:'',
            passwordStrength: {
                value: 0,
                color: ''
            }
        }
        this.passwordValidators = passwordValidators;
    }

    displayErrorBorder = (fieldName) => {
        return !this.passwordValidators[fieldName].valid && this.passwordValidators[fieldName].errors.length > 0 ? "has-danger" : '';
    };

    displayValidationErrors = (fieldName) => {
        const validator = this.passwordValidators[fieldName];
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

    handleInputChange = (event, inputPropName) => {
        const newState = Object.assign({}, this.state);
        if (event.target) {
            newState.userInfo[inputPropName] = event.target.value;
            this.updateValidators(inputPropName, event.target.value);
        }
        if (inputPropName == 'password') {
            let passwordIndicatorValue = strengthIndicator(event.target.value);
            let passwordStrengthColor = strengthColor(passwordIndicatorValue);
            newState.passwordStrength.color = passwordStrengthColor;
            newState.passwordStrength.value = passwordIndicatorValue;
        }
        this.setState(newState);
    }

    updateValidators = (fieldName, value) => {
        const { userInfo } = this.state;
        if (this.passwordValidators[fieldName] == undefined) return;
        this.passwordValidators[fieldName].errors = [];
        this.passwordValidators[fieldName].state = value;
        this.passwordValidators[fieldName].valid = true;
        this.passwordValidators[fieldName].rules.forEach((rule) => {
            if (rule.test instanceof RegExp) {
                if (!rule.test.test(value)) {
                    this.passwordValidators[fieldName].errors.push(rule.message);
                    this.passwordValidators[fieldName].valid = false;
                }
            } else if (typeof rule.test === 'function' && rule.fieldToCompare) {
                if (!rule.test(value, userInfo[rule.fieldToCompare])) {
                    this.passwordValidators[fieldName].errors.push(rule.message);
                    this.passwordValidators[fieldName].valid = false;
                }
            }
            else if (typeof rule.test === 'function') {
                if (!rule.test(value)) {
                    this.passwordValidators[fieldName].errors.push(rule.message);
                    this.passwordValidators[fieldName].valid = false;
                }
            }
        });
    }

    isFormValid = () => {
        let status = true;
        Object.keys(this.passwordValidators).forEach((field) => {
            if (!this.passwordValidators[field].valid) {
                status = false;
            }
        });
        return status;
    }

    UpdatePassword = () => {
        accessToken = localStorage.accessToken;
        let newState = Object.assign({}, this.state);
        var isResetPasswordFormValid = this.isFormValid();
        const { userInfo } = this.state;
        if (!isResetPasswordFormValid) {
            newState.userInfo.showOnSubmit = true;
            this.updateValidators("otp", userInfo.otp);
            this.updateValidators("password", userInfo.password);
            this.updateValidators("retypePassword", userInfo.retypePassword);
            this.setState(newState);
            return;
        }
        let formData = {
            "otpCode": newState.userInfo.otp,
            "password": newState.userInfo.password
        };
        axios({
            method: 'POST',
            url: service.baseAPIURL + 'Users/ResetPassword',
            headers: {
                'Content-Type': 'application/json'
            },
            data: formData
        })
            .then(response => {
                newState.errorMsg = response.data.result.statusMessage;
                newState.userInfo.otp = "";
                newState.userInfo.password = "";
                newState.userInfo.retypePassword = "";
                this.setState(newState);
            })
            .catch(error => {
                console.log(error);
            });
    }

    

    render() {
        const { passwordStrength } = this.state
        return (<>
            <Col lg="7" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent py-4">
                        <div className="text-muted text-center">
                            <h3 className="mb-0">Reset Password</h3>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center">
                            <h4 className="text-danger">{this.state.errorMsg}</h4>
                        </div>
                        <Form role="form">
                            <Row className="mb-1">
                                <Col md="3">
                                    <label>OTP</label>
                                </Col>
                                <Col md="9" className={this.displayErrorBorder("otp")}>
                                    <Input type="text" placeholder="Enter OTP" value={this.state.userInfo.otp} onChange={(e) => this.handleInputChange(e, "otp")} />
                                    {this.displayValidationErrors('otp')}
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col md="3">
                                    <label>New Password</label>
                                </Col>
                                <Col md="9" className={this.displayErrorBorder("password")}>
                                    <Input type="password" placeholder="Enter password" value={this.state.userInfo.password} onChange={(e) => this.handleInputChange(e, "password")} />
                                    {this.displayValidationErrors('password')}
                                    <Progress title="Password strength indicator" style={{ marginBottom: 0 }} className="mt-1" value={passwordStrength.value} color={passwordStrength.color} />
                                </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col md="3">
                                    <label>Confirm Password</label>
                                </Col>
                                <Col md="9" className={this.displayErrorBorder("retypePassword")}>
                                    <Input type="password" placeholder="Retype password" value={this.state.userInfo.retypePassword} onChange={(e) => this.handleInputChange(e, "retypePassword")} />
                                    {this.displayValidationErrors('retypePassword')}
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md="12">
                                <Button color="primary" size="sm" type="button" onClick={this.UpdatePassword}>Update</Button>
                                <Button className="ml-auto" color="primary" size="sm" type="button" onClick={() => { window.location = '/#/auth/login' }}>Sign in</Button>
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

export default ResetPassword;