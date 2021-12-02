import React, {createRef, useEffect, useState} from "react";
import {Button, Card, Col, Form, Row, Spinner, Tab, Tabs, Toast, ToggleButton} from "react-bootstrap";
import {faCoffee, faSave, faPlusSquare, faUndo, faUserPlus, faList, faUserEdit} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import MyToast from "./MyToast";
import {useNavigate, useParams} from "react-router-dom";

function EditPlayer() {
    submitPlayer = submitPlayer.bind(this);
    playerChange = playerChange.bind(this);
    let {id} = useParams();
    const navigate = useNavigate();
    const [inputClasses,setClasses] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [isShow, setShow] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');
    const [playerDetails, setPlayerDetails] = useState({
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
    });
    function changeInput(isDisabled){
        let inputClasses;
        isDisabled ?
             setClasses({
                 'bg-dark':true,
                 'text-white-50':true,
                 'border-dark':true})
             :     setClasses({
                'bg-dark':true,
                'text-white':true,
                'border-gray':true})
    }
    function playerChange(event) {
        const value = event.target.value;
        setPlayerDetails({
            ...playerDetails,
            [event.target.name]: value
        });
    }

    function resetPlayer() {
        getPlayerDetails()
    }
    function goback()  {
    navigate('/players')
    }

    function getPlayerDetails() {
        const auth = {
            username: 'admin',
            password: 'admin'
        }
        axios.get("http://localhost:8080/api/users/edit/player/" + id, {auth})
            .then(response => response.data)
            .then((data) => {
                setPlayerDetails(data);
                setLoading(false);
                setLoaded(true);
                console.log(playerDetails);
            })
            .catch(error => {
                //TODO catch - with error message
                console.log(error.response); // this is the main part. Use the response property from the error object
            });

    }

    useEffect(() => {
        if (loaded === false) {
            getPlayerDetails()
        }
        console.log(playerDetails);
    }, [])

    useEffect(() => {
        console.log(isShow);
        changeInput(isDisabled);
    }, [isLoading, isShow, isDisabled]);


    function submitPlayer(event) {
        event.preventDefault();
        const player = {
            userPassword: playerDetails.userPassword,
            userLogin: playerDetails.userLogin,
            userEmail: playerDetails.userEmail,
            userCity: playerDetails.userCity,
            userCountry: playerDetails.userCountry,
            userStreet: playerDetails.userStreet,
            userZipCode: playerDetails.userZipCode,
            playerFirstName: playerDetails.playerFirstName,
            playerLastName: playerDetails.playerLastName,
            playerDOB: playerDetails.playerDOB,
            playerTeamName: playerDetails.playerTeamName,
            playerWeight: playerDetails.playerWeight,
            playerAdditionalInfo: playerDetails.playerAdditionalInfo,
            playerLicence: playerDetails.playerLicence,
            playerPhone: playerDetails.playerPhone,
        }
        console.log(player);
        const auth = {
            username: 'admin',
            password: 'admin'
        }
        axios.post("http://localhost:8080/api/users/edit/player/" + id, player, {auth})
            .then(response => {
                if (response.data != null) {
                    setShow(true)
                    console.log(isShow)
                    setMessage(response.data.message)
                    setMessageType("success")
                    setTimeout(() => setShow(false), 3000)
                    getPlayerDetails()
                } else {
                    setShow(false)
                }
            })
            .catch(error => {
                setShow(true)
                console.log(isShow)
                setMessage(error.status + " - " + error.message)
                setMessageType("danger")
                setTimeout(() => setShow(false), 3000)
            });

    }

    if (isLoading) {
        return (<Spinner className="spinner" animation="border" variant="light"/>)
    }
    return (
        <div>

            <div style={{"display": isShow ? "block" : "none"}}>
                <MyToast children={{
                    show: isShow,
                    message: message,
                    messageType: messageType
                }}/>
            </div>

            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faUserEdit}/> Edit Player
                    <div className={"fa-pull-right"}>
                    <ToggleButton
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-primary"
                        checked={!isDisabled}
                        value="1"
                        size="sm"

                        onChange={(e) => setDisabled(!e.currentTarget.checked)}
                    >
                        Toggle edit
                    </ToggleButton>{' '}
                    <Button  onClick={goback} size="sm" type="reset"  variant="outline-info">
                        <FontAwesomeIcon icon={faList}/> Back to list
                    </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form id="registerPlayerId" onReset={resetPlayer} onSubmit={submitPlayer}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="userEmail"
                                              type="email"
                                              controlId="formUserEmail"
                                              value={playerDetails.userEmail}
                                              onChange={playerChange}
                                              //disabled={isDisabled}
                                              className={"bg-transparent text-white-50 border-0"}
                                              placeholder="Enter user email"
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Login</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="userLogin"
                                              type="text"
                                              controlId="formUserLogin"
                                              value={playerDetails.userLogin}
                                              onChange={playerChange}
                                              //disabled={isDisabled}
                                              className={"bg-transparent text-white-50 border-0"}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Password</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="userPassword"
                                              type="password"
                                              controlId="formUserPassword"
                                              value={playerDetails.userPassword}
                                              onChange={playerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}

                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Player name</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="playerFirstName"
                                              type="text"
                                              controlId="formPlayerFirstName"
                                              value={playerDetails.playerFirstName}
                                              onChange={playerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Player Last Name</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="playerLastName"
                                              type="text"
                                              controlId="formPlayerLastName"
                                              value={playerDetails.playerLastName}
                                              onChange={playerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Player DOB</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="playerDOB"
                                              type="date" dateFormat="YYYY-MM-DD"
                                              controlId="formPlayerDOB"
                                              value={playerDetails.playerDOB}
                                              onChange={playerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Player Team</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="playerTeamName"
                                              type="text"
                                              controlId="formPlayerTeamName"
                                              value={playerDetails.playerTeamName}
                                              onChange={playerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Player weight</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="playerWeight"
                                              type="number"
                                              controlId="formPlayerWeight"
                                              value={playerDetails.playerWeight}
                                              onChange={playerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Player licence</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="playerLicence"
                                              type="text"
                                              controlId="formPlayerLicence"
                                              value={playerDetails.playerLicence}
                                              onChange={playerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Player phone</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="playerPhone"
                                              type="text"
                                              controlId="formPlayerPhone"
                                              value={playerDetails.playerPhone}
                                              onChange={playerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Player additional info</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="playerAdditionalInfo"
                                              as="textarea"
                                              controlId="formPlayerAdditionalInfo"
                                              value={playerDetails.playerAdditionalInfo}
                                              onChange={playerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">City</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="userCity"
                                              type="text"
                                              controlId="formUserCity"
                                              value={playerDetails.userCity}
                                              onChange={playerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Street</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="userStreet"
                                              type="text"
                                              controlId="formUserStreet"
                                              value={playerDetails.userStreet}
                                              onChange={playerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Country</Form.Label>
                            <Col sm="10"><Form.Control required name="userCountry"
                                                       type="text"
                                                       controlId="formUserCountry"
                                                       value={playerDetails.userCountry}
                                                       onChange={playerChange}
                                                       disabled={isDisabled}
                                                       className={inputClasses}
                            /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Zip CODE</Form.Label>
                            <Col sm="10"><Form.Control required name="userZipCode"
                                                       controlId="formUserZipCode"
                                                       value={playerDetails.userZipCode}
                                                       onChange={playerChange}
                                                       disabled={isDisabled}
                                                       className={inputClasses}
                                                       type="text"
                            /></Col>
                        </Form.Group>
                        <Button   disabled={isDisabled} type="submit"  variant="outline-success">
                            <FontAwesomeIcon icon={faSave}/> Save
                        </Button>{' '}
                        <Button disabled={isDisabled} type="reset"  variant="outline-info">
                            <FontAwesomeIcon icon={faUndo}/> Reset
                        </Button>{' '}


                    </Form>

                </Card.Body>
            </Card>
        </div>
    );


}

export default EditPlayer