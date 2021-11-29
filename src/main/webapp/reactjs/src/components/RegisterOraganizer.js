import React, {createRef} from "react";
import {Button, Card, Col, Form, Row, Tab, Tabs, Toast} from "react-bootstrap";
import {faCoffee, faSave, faPlusSquare, faUndo, faUserPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha
} from 'react-simple-captcha';
import MyToast from "./MyToast";

export default class RegisterOrganizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.message = "";
        this.state.messageType = "";
        this.submitOrganizer = this.submitOrganizer.bind(this);
        this.organizerChange = this.organizerChange.bind(this);
        this.captcha2 = createRef();
    }

    componentDidMount() {
        loadCaptchaEnginge(6, '#212529', 'white');
    };

    submitOrganizer = (event) => {
        event.preventDefault();
        //let user_captcha_value = document.getElementById('user_captcha_input').value;
        let user_captcha_value = this.captcha2.current.value;
        if (validateCaptcha(user_captcha_value, true) == true) {
            const organizer = {
                userEmail: this.state.userEmail,
                userLogin: this.state.userLogin,
                userPassword: this.state.userPassword,
                userCity: this.state.userCity,
                userCountry: this.state.userCountry,
                userStreet: this.state.userStreet,
                userZipCode: this.state.userZipCode,
                organizerName: this.state.organizerName
            }
            axios.post("http://localhost:8080/api/register/organizer", organizer)
                .then(response => {
                            if (response.data != null) {
                                this.setState({"show": true, "message": response.data.message, "messageType":"success"})
                                setTimeout(() => this.setState({"show": false}), 3000)
                            } else {
                                this.setState({"show": false})
                            }
                })
                .catch(error => {
                    this.setState({"show": true, "message": error.response.status +" - "+ error.response.data.message, "messageType":"danger"})
                    setTimeout(() => this.setState({"show": false}), 3000)
            });
            this.setState(this.initialState);
            this.captcha2.current.value = '';
        } else {
            alert('Captcha Does Not Match');
            this.captcha2.current.value = '';
        }
    }

    initialState = {
        userEmail: '',
        userLogin: '',
        userPassword: '',
        userCity: '',
        userCountry: '',
        userStreet: '',
        userZipCode: '',
        organizerName:''
    }

    organizerChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    resetOrganizer = () => {
        this.setState(() => this.initialState);
    }

    render() {
        const {
            userEmail,
            userLogin,
            userPassword,
            userCity,
            userCountry,
            userStreet,
            userZipCode,
            organizerName
        } = this.state;
        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast children={{
                        show:this.state.show,
                        message:this.state.message,
                        messageType:this.state.messageType
                    }}/>
                </div>

                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faUserPlus}/> Register Organizer</Card.Header>
                    <Card.Body>

                        <Form onReset={this.resetOrganizer} onSubmit={this.submitOrganizer} id="registerOrganizerId">
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Email</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="userEmail"
                                                  type="email"
                                                  controlId="formUserEmail"
                                                  value={userEmail}
                                                  onChange={this.organizerChange}
                                                  className={"bg-dark text-white border-gray"}
                                                  placeholder="Enter user email"
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Login</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="userLogin"
                                                  type="text"
                                                  controlId="formUserLogin"
                                                  value={userLogin}
                                                  onChange={this.organizerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Password</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="userPassword"
                                                  type="password"
                                                  controlId="formUserPassword"
                                                  value={userPassword}
                                                  onChange={this.organizerChange}
                                                  className={"bg-dark text-white border-gray"}

                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Name</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="organizerName"
                                                  type="text"
                                                  controlId="formOrganizerName"
                                                  value={organizerName}
                                                  onChange={this.organizerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">City</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="userCity"
                                                  type="text"
                                                  controlId="formUserCity"
                                                  value={userCity}
                                                  onChange={this.organizerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Street</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="userStreet"
                                                  type="text"
                                                  controlId="formUserStreet"
                                                  value={userStreet}
                                                  onChange={this.organizerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Country</Form.Label>
                                <Col sm="10"><Form.Control required name="userCountry"
                                                           type="text"
                                                           controlId="formUserCountry"
                                                           value={userCountry}
                                                           onChange={this.organizerChange}
                                                           className={"bg-dark text-white border-gray"}
                                /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Zip CODE</Form.Label>
                                <Col sm="10"><Form.Control required name="userZipCode"
                                                           controlId="formUserZipCode"
                                                           value={userZipCode}
                                                           onChange={this.organizerChange}
                                                           className={"bg-dark text-white border-gray"}
                                                           type="text"
                                /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Captcha</Form.Label>
                                <Col sm="10">
                                    <LoadCanvasTemplate reloadText="Reload My Captcha" reloadColor="white"/>
                                    <Form.Control required name="user_captcha_input2"
                                                  controlId="user_captcha_input2"
                                                  className={"bg-dark text-white border-gray"}
                                                  type="text"
                                                  placeholder="Enter Captcha Value"
                                                  ref={this.captcha2}
                                    /></Col>
                            </Form.Group>


                            <Button variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> Register
                            </Button>{' '}
                            <Button variant="info" type="reset" className="text-white">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Form>

                    </Card.Body>
                </Card>
            </div>
        );
    }
};