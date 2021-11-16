import React, {useState} from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    NavItem,
    NavLink,
    Nav,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    h3, Label
  } from "reactstrap";
  import { Redirect, Link } from 'react-router-dom'
  import validator from 'validator';
  import service from '../services';
  import axios from "axios";

  const Login = () => {

  const [state, setState] = useState({email: '', password: '', errorMsg:'', emailError: false, passwordError: false, loggedIn: false});

  const handleChange = (e) => {
    const {id , value} = e.target  
    
    setState(prevState => ({
        ...prevState,
        [id] : value,
        error: false
    }))
    if(id === 'email'){
      setState(prevState => ({
        ...prevState,
        emailError: false
      }))
    }
    else{
      setState(prevState => ({
        ...prevState,
        passwordError: false
      }))
    }
}


  const validateLogin = (e) => {
        e.preventDefault();
       if(!validator.isEmail(state.email)){
          setState(prevState => ({
            ...prevState,
            emailError: true
          }))
       }
       if(validator.isEmpty(state.password)){
        setState(prevState => ({
          ...prevState,
          passwordError: true
        }))
       }
       else{
        let logindata = {
          Email : state.email,
          Password: state.password
         }
         submitLogin(logindata)
       }
  
  }

  const submitLogin = (logindata) => {
    if(logindata.Email==="admin"&& logindata.Password==="admin"){
        setState(prevState => ({
          ...prevState,
          errorMsg: ""
        }))
        localStorage.setItem('userDetails', JSON.stringify(logindata))
        localStorage.setItem('accessToken', "skjfskdjflkjdsflkjdskfjkdsjflksda")
        localStorage.setItem('refreshToken', "sfsdfdsfdsfsdfdsfdsfdsfdsfdsfdsfdsf")
        localStorage.setItem('userId', "123")
        setState(prevState => ({
          ...prevState,
          loggedIn: true
        }))

    }
    else{
      setState(prevState => ({
                ...prevState,
                errorMsg: "Login failed"
              }))
    }
  }

  // const submitLogin = (logindata) => {
  //   const url = service.baseAPIURL + 'login/validatelogin'
  //   axios.post(url, logindata)
  //   .then(response => {
  //     let msg = response.data.result.message,
  //         user = response.data.result.user;
  //     if(user === null){
  //       setState(prevState => ({
  //         ...prevState,
  //         errorMsg: msg
  //       }))
  //     }
  //     else{
  //       setState(prevState => ({
  //         ...prevState,
  //         errorMsg: ""
  //       }))
  //       console.log(user)
  //       localStorage.setItem('userDetails', JSON.stringify(user))
  //       localStorage.setItem('accessToken', user.accessToken)
  //       localStorage.setItem('refreshToken', user.refreshToken)
  //       localStorage.setItem('userId', user.id)
  //       setState(prevState => ({
  //         ...prevState,
  //         loggedIn: true
  //       }))
  //     }
  //   })
  //   .catch(error => {
  //     // handle error
  //     console.log(error);
  //   })
  // }
  
        return(state.loggedIn ? <Redirect to="/admin/beers"/> : 
            <>
            <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent py-4">
              <div className="text-muted text-center">
                <h3 className="mb-0">Sign In</h3>
              </div>   
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
             <div className="text-center">
               <h4 className="text-danger">{state.errorMsg}</h4>
             </div>
              <Form role="form"  noValidate>
                <FormGroup className={state.emailError ? 'has-danger mb-3': 'mb-3'}>
                  <Label>Email</Label>
                  <InputGroup className={state.emailError ? 'is-invalid input-group-alternative' : 'input-group-alternative'} >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input id="email" placeholder="Email" type="email" autoComplete="new-email" onChange={handleChange} className={state.emailError ? 'is-invalid' : ''} />
                  </InputGroup>
                </FormGroup>
                <FormGroup className={state.passwordError ? 'has-danger mb-3' : 'mb-3'}>
                  <Label>Password</Label>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input id="password" placeholder="Password" type="password" autoComplete="new-password" onChange={handleChange} className={state.passwordError ? 'is-invalid' : ''}/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={validateLogin}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
                        <Nav className="ml-auto" navbar>

                            <NavItem>
                                <NavLink
                                    className="nav-link-icon"
                                    to="/auth/forgotpassword"
                                    tag={Link}
                                >
                                    <span className="nav-link-inner--text">Forgot Password</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
          
          </Row>
        </Col>
        </>
        )
    }


export default Login