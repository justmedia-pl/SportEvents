import React from "react";
import {Button, Card, Col, Form, Row, Tab, Tabs} from "react-bootstrap";
import {faCoffee, faSave, faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export default class RegisterPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.submitPlayer = this.submitPlayer.bind(this);
        this.playerChange = this.playerChange.bind(this);
    }

    submitPlayer(event) {
        alert(this.state.userEmail);
        event.preventDefault();

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

    playerChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        const { userEmail,
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
            <Card className={"border border-dark bg-dark text-white "}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Register Player</Card.Header>
                <Card.Body>

                    <Form onSubmit={this.submitPlayer} id="registerPlayerId">
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
                                              type="date"
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


                        <Button variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> Register
                        </Button>
                    </Form>

                </Card.Body>
            </Card>
        );
    }
};