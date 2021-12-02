import React, {createRef, useEffect, useState} from "react";
import {Button, Card, Col, Form, Row, Spinner, Tab, Tabs, Toast, ToggleButton} from "react-bootstrap";
import {faCoffee, faSave, faPlusSquare, faUndo, faUserPlus, faList, faUserEdit} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import MyToast from "./MyToast";
import {useNavigate, useParams} from "react-router-dom";

function EditOrganizer() {
    submitOrganizer = submitOrganizer.bind(this);
    organizerChange = organizerChange.bind(this);
    let {id} = useParams();
    const navigate = useNavigate();
    const [inputClasses,setClasses] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [isShow, setShow] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');
    const [organizerDetails, setOrganizerDetails] = useState({
        userEmail: '',
        userLogin: '',
        userPassword: '',
        userCity: '',
        userCountry: '',
        userStreet: '',
        userZipCode: '',
        organizerName:''
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
    function organizerChange(event) {
        const value = event.target.value;
        setOrganizerDetails({
            ...organizerDetails,
            [event.target.name]: value
        });
    }

    function resetOrganizer() {
        getOrganizerDetails()
    }
    function goback()  {
    navigate('/organizers')
    }

    function getOrganizerDetails() {
        const auth = {
            username: 'admin',
            password: 'admin'
        }
        axios.get("http://localhost:8080/api/users/edit/organizer/" + id, {auth})
            .then(response => response.data)
            .then((data) => {
                setOrganizerDetails(data);
                setLoading(false);
                setLoaded(true);
                console.log(organizerDetails);
            })
            .catch(error => {
                //TODO catch - with error message
                console.log(error.response); // this is the main part. Use the response property from the error object
            });

    }

    useEffect(() => {
        if (loaded === false) {
            getOrganizerDetails()
        }
        console.log(organizerDetails);
    }, [])

    useEffect(() => {
        console.log(isShow);
        changeInput(isDisabled);
    }, [isLoading, isShow, isDisabled]);


    function submitOrganizer(event) {
        event.preventDefault();
        const organizer = {
            userEmail: organizerDetails.userEmail,
            userLogin: organizerDetails.userLogin,
            userPassword: organizerDetails.userPassword,
            userCity: organizerDetails.userCity,
            userCountry: organizerDetails.userCountry,
            userStreet: organizerDetails.userStreet,
            userZipCode: organizerDetails.userZipCode,
            organizerName: organizerDetails.organizerName
        }
        console.log(organizer);
        const auth = {
            username: 'admin',
            password: 'admin'
        }
        axios.post("http://localhost:8080/api/users/edit/organizer/" + id, organizer, {auth})
            .then(response => {
                if (response.data != null) {
                    setShow(true)
                    console.log(isShow)
                    setMessage(response.data.message)
                    setMessageType("success")
                    setTimeout(() => setShow(false), 3000)
                    setDisabled(true);
                    getOrganizerDetails()
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
                <Card.Header><FontAwesomeIcon icon={faUserEdit}/> Edit Organizer
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
                    <Form id="registerOrganizerId" onReset={resetOrganizer} onSubmit={submitOrganizer}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="userEmail"
                                              type="email"
                                              controlId="formUserEmail"
                                              value={organizerDetails.userEmail}
                                              onChange={organizerChange}
                                              disabled={true}
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
                                              value={organizerDetails.userLogin}
                                              onChange={organizerChange}
                                              disabled={true}
                                              className={"bg-transparent text-white-50 border-0"}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Password</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="userPassword"
                                              type="password"
                                              controlId="formUserPassword"
                                              value={organizerDetails.userPassword}
                                              onChange={organizerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}

                                /></Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Organizer Team</Form.Label>
                            <Col sm="10">
                                <Form.Control required name="organizerName"
                                              type="text"
                                              controlId="formOrganizerTeamName"
                                              value={organizerDetails.organizerName}
                                              onChange={organizerChange}
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
                                              value={organizerDetails.userCity}
                                              onChange={organizerChange}
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
                                              value={organizerDetails.userStreet}
                                              onChange={organizerChange}
                                              disabled={isDisabled}
                                              className={inputClasses}
                                /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Country</Form.Label>
                            <Col sm="10"><Form.Control required name="userCountry"
                                                       type="text"
                                                       controlId="formUserCountry"
                                                       value={organizerDetails.userCountry}
                                                       onChange={organizerChange}
                                                       disabled={isDisabled}
                                                       className={inputClasses}
                            /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">Zip CODE</Form.Label>
                            <Col sm="10"><Form.Control required name="userZipCode"
                                                       controlId="formUserZipCode"
                                                       value={organizerDetails.userZipCode}
                                                       onChange={organizerChange}
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

export default EditOrganizer