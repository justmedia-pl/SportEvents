import React,{Component} from "react";
import {Card, Button, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCoffee, faList} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {Link} from "react-router-dom";

export default class EventsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }
    componentDidMount() {
        axios.get("http://localhost:8080/api/events")
            .then(response => response.data)
            .then((data) => {
                this.setState({events: data}
                );
            });
    }

    render() {
        return(
        <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header><FontAwesomeIcon icon={faList} /> Events</Card.Header>
            <Card.Body>
                <Table bordered hover striped variant="dark">
                    <thead>
                    <tr align="center">
                        <th>Event Date</th>
                        <th>Event title</th>
                        <th>Localization</th>
                        <th>Payment Fee</th>
                        <th>Subscribed users</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.events.length === 0 ?
                        <tr align="center">
                            <td colSpan="6">No events available</td>
                        </tr> :
                        this.state.events.map((eventDetails) => (
                            <tr key={eventDetails.eventId} align="center">
                                <td>{eventDetails.eventDate}</td>
                                <td>{eventDetails.title}</td>
                                <td>Org name</td>
                                <td>  {eventDetails.eventFee === 0 ? "Free" : eventDetails.eventFee}</td>
                                <td>{eventDetails.subscriptionsCount}</td>
                                <td><Link to={"/events/"+eventDetails.eventId}>
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
