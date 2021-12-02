import React, {Component} from "react";
import {Card, Button, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faCoffee,
    faInfo,
    faList,
    faTimesCircle,
    faTrash,
    faUser,
    faUserTie
} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {Link} from "react-router-dom";
import MyToast from "./MyToast";

export default class Organizers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            messageType: '',
            message: '',
            organizers: []
        };
    }

    getData() {
        const auth = {
            username: 'admin',
            password: 'admin'
        }
        axios.get("http://localhost:8080/api/organizers", {auth})
            .then(response => response.data)
            .then((data) => {
                this.setState({organizers: data}
                );
            });
    }

    componentDidMount() {
        this.getData()
    }

    deleteOrganizer = (organizerId) => {
        const auth = {
            username: 'admin',
            password: 'admin'
        }
        axios.delete("http://localhost:8080/api/users/" + organizerId, {auth})
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        organizers: this.state.organizers.filter(organizer => organizer.userId !== organizerId)
                    })
                    this.setState({
                        "show": true, "message": "User deleted !", "messageType": "success"
                    })
                    setTimeout(() => this.setState({"show": false}), 3000)
                } else {
                    this.setState({"show": false})
                }
            }).catch(error => {
            this.setState({
                "show": true,
                "message": error.response.status + " - " + error.response.data.message,
                "messageType": "danger"
            })
            setTimeout(() => this.setState({"show": false}), 3000)
        });
    };
    activateOrganizer = (organizerId) => {
        const auth = {
            username: 'admin',
            password: 'admin'
        }
        axios.post("http://localhost:8080/api/users/activate/" + organizerId, {}, {auth})
            .then(response => {
                if (response.data != null) {
                    this.getData()
                    this.setState({
                        "show": true, "message": "User Activated!", "messageType": "success"
                    })
                    setTimeout(() => this.setState({"show": false}), 3000)
                } else {
                    this.setState({"show": false})
                }
            }).catch(error => {
            this.setState({"show": true, "message": error.status + " - " + error.message, "messageType": "danger"})
            setTimeout(() => this.setState({"show": false}), 3000)
        });
    };
    deactivateOrganizer = (organizerId) => {
        const auth = {
            username: 'admin',
            password: 'admin'
        }
        axios.post("http://localhost:8080/api/users/deactivate/" + organizerId, {}, {auth})
            .then(response => {
                if (response.data != null) {
                    this.getData();
                    this.setState({
                        "show": true, "message": "User Deactivated!", "messageType": "success"
                    })
                    setTimeout(() => this.setState({"show": false}), 3000)
                } else {
                    this.setState({"show": false})
                }
            }).catch(error => {
            this.setState({"show": true, "message": error.status + " - " + error.message, "messageType": "danger"})
            setTimeout(() => this.setState({"show": false}), 3000)
        });
    };

    isDisabled = false;

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast children={{
                        show: this.state.show,
                        message: this.state.message,
                        messageType: this.state.messageType
                    }}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faUserTie}/> Organizers</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr align="center">
                                <th>#</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Events</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.organizers.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">No events available</td>
                                </tr> :

                                this.state.organizers.map((organizer, index) => (

                                <tr key={organizer.userId} align="center">
                                <td>{index}</td>
                                <td>{organizer.organizerName}</td>
                                <td>{organizer.email}</td>
                                <td>{organizer.eventsCount}</td>
                                <td>
                            {organizer.active === true ?
                                <FontAwesomeIcon icon={faCheck}/>
                                :
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            }
                                </td>
                                    {organizer.organizerName === "SportEvent" ?
                                        this.isDisabled = true
                                       : this.isDisabled = false

                                    }

                                <td>
                                <Link to={"/edit/organizer/" + organizer.userId}>
                                <Button  disabled={this.isDisabled} variant="outline-success"><FontAwesomeIcon
                                icon={faInfo}/></Button>
                                </Link>{' '}
                                <Button  disabled={this.isDisabled} variant="outline-danger"
                                onClick={this.deleteOrganizer.bind(this, organizer.userId)}><FontAwesomeIcon
                                icon={faTrash}/></Button>
                                <Button  disabled={this.isDisabled} variant="outline-success"
                                onClick={this.activateOrganizer.bind(this, organizer.userId)}>
                                <FontAwesomeIcon icon={faCheck}/></Button>
                                <Button  disabled={this.isDisabled} variant="outline-danger"
                                onClick={this.deactivateOrganizer.bind(this, organizer.userId)}>
                                <FontAwesomeIcon icon={faTimesCircle}/></Button>

                                </td>
                                </tr>
                                ))

                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
