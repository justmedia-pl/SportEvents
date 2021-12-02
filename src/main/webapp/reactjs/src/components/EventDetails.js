import React, {Component, useEffect, useState} from "react";
import {Card, Button, Table, Spinner} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faCoffee, faList, faTimesCircle, faTrophy} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import { convertTextToDateTime, convertTextToDate } from "./UtilityServices"

function EventsDetails () {
  const [isLoading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState([])
    let {id} = useParams();
    function getEvents() {
        axios.get("http://localhost:8080/api/events/"+id)
            .then(response => response.data)
            .then((data) => {
                setEventDetails(data);
                setLoading(false);
            })
            .catch ( error => {
                //TODO catch - with error message
            console.log(error.response); // this is the main part. Use the response property from the error object
        });

    }
    useEffect(() => {
      getEvents();
    },[])
    console.log(eventDetails)
    if (isLoading) {
        return ( <Spinner className="spinner" animation="border" variant="light" />)
    }
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faTrophy} /> {eventDetails.title}
                    <div className={"fa-pull-right"}>
                        <Link to={"/events/"}>
                            <Button  size="sm" type="reset"  variant="outline-info">
                                <FontAwesomeIcon icon={faList}/> Back to list
                            </Button>
                        </Link>
                    </div>
                    </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p>Event organizer: {eventDetails.organizerName}</p>
                        <p>Event date:
                            {convertTextToDateTime(eventDetails.eventDate)}  </p>
                        <p>Player limit: {eventDetails.eventPlayerLimit}</p>
                        <p>Event fee: {eventDetails.eventFee}</p>

                    </Card.Text>
                    <Table bordered hover striped variant="dark">
                        <thead>
                        <tr align="center">
                            <th>#</th>
                            <th>Player email</th>
                            <th>Player team*</th>
                            <th>Approved</th>
                            <th>Payment status</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>

                        {eventDetails.playerSubscriptions.length === 0 ?
                            <tr align="center">
                                <td colSpan="6">No subscriptions avalable </td>
                            </tr> :
                            eventDetails.playerSubscriptions.map((subscription, index) => (
                            <tr align="center">
                                <td>{index}</td>
                                <td>{subscription.playerEmail}</td>
                                <td>*</td>
                                <td>{subscription.subscriptionApproved === "true" ?
                                    <FontAwesomeIcon icon={faCheck}/>
                                    :
                                    <FontAwesomeIcon icon={faTimesCircle} />

                                }</td>
                                <td>{subscription.subscriptionPaymentDone === "true" ?
                                    <FontAwesomeIcon icon={faCheck}/>
                                    :
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                }</td>
                                <td>{convertTextToDateTime(subscription.subscriptionDate)}</td>
                            </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
)
}export default EventsDetails
