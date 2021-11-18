import React from "react";
import {Button, Card, Col, Form, FormControl, InputGroup, Row, Tab, Tabs} from "react-bootstrap";
import {faEnvelope, faSave, faSignInAlt, faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        login: '', password: ''
    };
    credentialChange = event => {
        this.setState({[event.target.name]: event.target.value});

    };

    resetLoginForm = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const {login, password} = this.state;
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faSignInAlt}/> Login</Card.Header>
                <Card.Body>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Login</Form.Label>
                        <Col sm="10">

                            <FormControl className="bg-dark text-white"
                                         placeholder="Enter login or e-mail"
                                         required
                                         autoComplete="off"
                                         type="text"
                                         name="login"
                                         onChange={this.credentialChange}
                                         value={this.login}/>

                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Login</Form.Label>
                        <Col sm="10">

                            <FormControl className="bg-dark text-white"
                                         placeholder="Enter login or e-mail"
                                         required
                                         autoComplete="off"
                                         type="password"
                                         name="password"
                                         onChange={this.credentialChange}
                                         value={this.password}/>

                        </Col>
                    </Form.Group>

                </Card.Body>
                <Card.Footer>
                    <Button variant="success" type="submit"
                            disabled={this.state.login.length === 0 && this.state.password ===0}>
                        <FontAwesomeIcon icon={faSave}/> Login
                    </Button>
                    <Button variant="success" type="reset" onClick={this.resetLoginForm} onChange={this.credentialChange}
                    disabled={this.state.login.length === 0 && this.state.password ===0}>
                        <FontAwesomeIcon icon={faTrash}/> Reset
                    </Button>
                </Card.Footer>
            </Card>
        )
    }
}

export default Login;