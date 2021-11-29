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

export default class RegisterPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.message = "";
        this.submitPlayer = this.submitPlayer.bind(this);
        this.playerChange = this.playerChange.bind(this);
        this.captcha = createRef();
    }

    componentDidMount() {
        loadCaptchaEnginge(6, '#212529', 'white');
    };

    submitPlayer = (event) => {
        event.preventDefault();
        //let user_captcha_value = document.getElementById('user_captcha_input').value;
        let user_captcha_value = this.captcha.current.value;
        if (validateCaptcha(user_captcha_value, true) == true) {
            const player = {
                userEmail: this.state.userEmail,
                userLogin: this.state.userLogin,
                userPassword: this.state.userPassword,
                playerFirstName: this.state.playerFirstName,
                playerLastName: this.state.playerLastName,
                playerDOB: this.state.playerDOB,
                playerTeamName: this.state.playerTeamName,
                playerWeight: this.state.playerWeight,
                playerLicence: this.state.playerLicence,
                playerPhone: this.state.playerPhone,
                playerAdditionalInfo: this.state.playerAdditionalInfo,
                userCity: this.state.userCity,
                userCountry: this.state.userCountry,
                userStreet: this.state.userStreet,
                userZipCode: this.state.userZipCode
            }
            axios.post("http://localhost:8080/api/register/player", player)
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
            this.captcha.current.value = '';
        } else {
            alert('Captcha Does Not Match');
            this.captcha.current.value = '';
        }
    }

    initialState = {
        userEmail: '',
        userLogin: '',
        userPassword: '',
        playerFirstName: '',
        playerLastName: '',
        playerDOB: '',
        playerTeamName: '',
        playerWeight: '',
        playerLicence: '',
        playerPhone: '',
        playerAdditionalInfo: '',
        userCity: '',
        userCountry: '',
        userStreet: '',
        userZipCode: ''
    }

    playerChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    resetPlayer = () => {
        this.setState(() => this.initialState);
    }

    render() {

        const {
            userEmail,
            userLogin,
            userPassword,
            playerFirstName,
            playerLastName,
            playerDOB,
            playerTeamName,
            playerWeight,
            playerLicence,
            playerPhone,
            playerAdditionalInfo,
            userCity,
            userCountry,
            userStreet,
            userZipCode
        } = this.state;
        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast children={{
                        show:this.state.show,
                        message:"User registered successfully please check given email and click activation link !"
                    }}/>
                </div>

                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faUserPlus}/> Register Player</Card.Header>
                    <Card.Body>

                        <Form onReset={this.resetPlayer} onSubmit={this.submitPlayer} id="registerPlayerId">
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Email</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="userEmail"
                                                  type="email"
                                                  controlId="formUserEmail"
                                                  value={userEmail}
                                                  onChange={this.playerChange}
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
                                                  onChange={this.playerChange}
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
                                                  onChange={this.playerChange}
                                                  className={"bg-dark text-white border-gray"}

                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Player name</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="playerFirstName"
                                                  type="text"
                                                  controlId="formPlayerFirstName"
                                                  value={playerFirstName}
                                                  onChange={this.playerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Player Last Name</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="playerLastName"
                                                  type="text"
                                                  controlId="formPlayerLastName"
                                                  value={playerLastName}
                                                  onChange={this.playerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Player DOB</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="playerDOB"
                                                  type="date" dateFormat="YYYY-MM-DD"
                                                  controlId="formPlayerDOB"
                                                  value={playerDOB}
                                                  onChange={this.playerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Player Team</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="playerTeamName"
                                                  type="text"
                                                  controlId="formPlayerTeamName"
                                                  value={playerTeamName}
                                                  onChange={this.playerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Player weight</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="playerWeight"
                                                  type="number"
                                                  controlId="formPlayerWeight"
                                                  value={playerWeight}
                                                  onChange={this.playerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Player licence</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="playerLicence"
                                                  type="text"
                                                  controlId="formPlayerLicence"
                                                  value={playerLicence}
                                                  onChange={this.playerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Player phone</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="playerPhone"
                                                  type="text"
                                                  controlId="formPlayerPhone"
                                                  value={playerPhone}
                                                  onChange={this.playerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Player additional info</Form.Label>
                                <Col sm="10">
                                    <Form.Control required name="playerAdditionalInfo"
                                                  as="textarea"
                                                  controlId="formPlayerAdditionalInfo"
                                                  value={playerAdditionalInfo}
                                                  onChange={this.playerChange}
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
                                                  onChange={this.playerChange}
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
                                                  onChange={this.playerChange}
                                                  className={"bg-dark text-white border-gray"}
                                    /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Country</Form.Label>
                                <Col sm="10"><Form.Control required name="userCountry"
                                                           type="text"
                                                           controlId="formUserCountry"
                                                           value={userCountry}
                                                           onChange={this.playerChange}
                                                           className={"bg-dark text-white border-gray"}
                                /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Zip CODE</Form.Label>
                                <Col sm="10"><Form.Control required name="userZipCode"
                                                           controlId="formUserZipCode"
                                                           value={userZipCode}
                                                           onChange={this.playerChange}
                                                           className={"bg-dark text-white border-gray"}
                                                           type="text"
                                /></Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="2">Captcha</Form.Label>
                                <Col sm="10">
                                    <LoadCanvasTemplate reloadText="Reload My Captcha" reloadColor="white"/>
                                    <Form.Control required name="user_captcha_input"
                                                  controlId="user_captcha_input"
                                                  className={"bg-dark text-white border-gray"}
                                                  type="text"
                                                  placeholder="Enter Captcha Value"
                                                  ref={this.captcha}
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