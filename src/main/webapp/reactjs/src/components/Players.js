import React,{Component} from "react";
import {Card, Button, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faCoffee, faInfo, faList, faTimesCircle, faTrash, faUser} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {Link} from "react-router-dom";
import MyToast from "./MyToast";

export default class Players extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            messageType:'',
            message:'',
            players: []
        };
    }
    getData(){
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
    componentDidMount() {
      this.getData()
    }

    deletePlayer = (playerId) => {
        const auth = {
            username : 'admin',
            password : 'admin'
        }
        axios.delete("http://localhost:8080/api/users/"+playerId,{auth})
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        players: this.state.players.filter(player => player.userId !== playerId)})
                    this.setState({
                        "show": true, "message": "User deleted !", "messageType":"success"})
                        setTimeout(() => this.setState({"show": false}), 3000)
                    } else {
                    this.setState({"show": false})
                }
            }).catch(error => {
            this.setState({"show": true, "message": error.response.status +" - "+ error.response.data.message, "messageType":"danger"})
            setTimeout(() => this.setState({"show": false}), 3000)
        });
    };
    activatePlayer = (playerId) => {
        const auth = {
            username : 'admin',
            password : 'admin'
        }
        axios.post("http://localhost:8080/api/users/activate/"+playerId,{},{auth})
            .then(response => {
                if(response.data != null) {
                this.getData()
                    this.setState({
                        "show": true, "message": "User Activated!", "messageType":"success"})
                    setTimeout(() => this.setState({"show": false}), 3000)
                } else {
                    this.setState({"show": false})
                }
            }).catch(error => {
            this.setState({"show": true, "message": error.status +" - "+ error.message, "messageType":"danger"})
            setTimeout(() => this.setState({"show": false}), 3000)
        });
    };
    deactivatePlayer = (playerId) => {
        const auth = {
            username : 'admin',
            password : 'admin'
        }
        axios.post("http://localhost:8080/api/users/deactivate/"+playerId,{},{auth})
            .then(response => {
                if(response.data != null) {
               this.getData();
                    this.setState({
                        "show": true, "message": "User Deactivated!", "messageType":"success"})
                    setTimeout(() => this.setState({"show": false}), 3000)
                } else {
                    this.setState({"show": false})
                }
            }).catch(error => {
            this.setState({"show": true, "message": error.status +" - "+ error.message, "messageType":"danger"})
            setTimeout(() => this.setState({"show": false}), 3000)
        });
    };
    render() {
        return(
            <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast children={{
                    show:this.state.show,
                    message:this.state.message,
                    messageType:this.state.messageType
                }}/>
            </div>
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
                                    <td><Link to={"/edit/player/"+player.userId}>
                                        <Button variant="outline-success" ><FontAwesomeIcon icon={faInfo}/></Button>
                                    </Link>{' '}
                                        <Button variant="outline-danger" onClick={this.deletePlayer.bind(this,player.userId)}><FontAwesomeIcon icon={faTrash}/></Button>
                                        <Button variant="outline-success" onClick={this.activatePlayer.bind(this,player.userId)}> <FontAwesomeIcon icon={faCheck}/></Button>
                                        <Button variant="outline-danger" onClick={this.deactivatePlayer.bind(this,player.userId)}> <FontAwesomeIcon icon={faTimesCircle}/></Button>
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
