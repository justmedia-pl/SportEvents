import React from "react";
import './App.css';

import NavigationBar from "./components/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import EventsList from "./components/EventsList";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterPlayer from "./components/RegisterPlayer";
import RegisterOrganizer from "./components/RegisterOraganizer";
import Login from "./components/Login";



function App() {
    return (
        <Router>
            <NavigationBar/>
            <Container>

                <Row>
                    <Col lg={12} className={"margin-top margin-bottom"}>
                        <Routes>
                            <Route path="/" element={<Welcome/>}/>
                            <Route path="/events" element={<EventsList/>}/>
                            <Route path="/register/player" element={<RegisterPlayer/>}/>
                            <Route path="/register/organizer" element={<RegisterOrganizer/>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                    </Col>
                </Row>

            </Container>
        <Footer />
        </Router>
    );
}

export default App;
