import React,{Component} from "react";
import {Card, Button, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faCoffee, faList, faTimesCircle, faUser, faUserTie} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {Link} from "react-router-dom";

export default class Organizers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            organizers: []
        };
    }
    componentDidMount() {
        const auth = {
            username : 'admin',
            password : 'admin'
        }
        axios.get("http://localhost:8080/api/organizers",{auth})
            .then(response => response.data)
            .then((data) => {
                this.setState({organizers: data}
                );
            });
    }

    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faUserTie} /> Organizers</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                        <tr align="center">
                            <th>#</th>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Subcriptions</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.organizers.length === 0 ?
                            <tr align="center">
                                <td colSpan="6">No events available</td>
                            </tr> :
                            this.state.organizers.map((organizer,index) => (
                                <tr key={organizer.userId} align="center">
                                    <td>{index}</td>
                                    <td>{organizer.name}</td>
                                    <td>{organizer.email}</td>
                                    <td>{organizer.eventsCount}</td>
                                    <td>
                                        {organizer.active === true ?
                                            <FontAwesomeIcon icon={faCheck}/>
                                            :
                                            <FontAwesomeIcon icon={faTimesCircle}/>
                                        }
                                    </td>
                                    <td><Link to={"/organizers/"+organizer.userId}>
                                        <Button variant="success" className={"btn-success"}>Show details</Button>
                                    </Link></td>
                                </tr>
                            ))

                        }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}
