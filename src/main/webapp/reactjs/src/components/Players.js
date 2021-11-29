import React,{Component} from "react";
import {Card, Button, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faCoffee, faList, faTimesCircle, faUser} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {Link} from "react-router-dom";

export default class Players extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players: []
        };
    }
    componentDidMount() {
        const auth = {
            username : 'admin',
            password : 'admin'
        }
        axios.get("http://localhost:8080/api/players",{auth})
            .then(response => response.data)
            .then((data) => {
                this.setState({players: data}
                );
            });
    }

    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faUser} /> Players</Card.Header>
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
                        {this.state.players.length === 0 ?
                            <tr align="center">
                                <td colSpan="6">No events available</td>
                            </tr> :
                            this.state.players.map((player,index) => (
                                <tr key={player.userId} align="center">
                                    <td>{index}</td>
                                    <td>{player.name}</td>
                                    <td>{player.email}</td>
                                    <td>{player.subscriptionsCount}</td>
                                    <td>
                                        {player.active === true ?
                                            <FontAwesomeIcon icon={faCheck}/>
                                            :
                                            <FontAwesomeIcon icon={faTimesCircle}/>
                                        }
                                    </td>
                                    <td><Link to={"/players/"+player.userId}>
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
