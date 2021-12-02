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
import EventDetails from "./components/EventDetails";
import Login from "./components/Login";
import Players from "./components/Players";
import Organizers from "./components/Organizers";
import EditPlayer from "./components/EditPlayer";



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
                            <Route exact path="/events/:id" element={<EventDetails/>}/>
                            <Route path="/register/player" element={<RegisterPlayer/>}/>
                            <Route path="/edit/player/:id" element={<EditPlayer/>}/>
                            <Route path="/register/organizer" element={<RegisterOrganizer/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/players" element={<Players/>}/>
                            <Route path="/players/:id" element={<Players/>}/>
                            <Route path="/organizers" element={<Organizers/>}/>
                            <Route path="/organizers/:id" element={<Organizers/>}/>
                        </Routes>
                    </Col>
                </Row>

            </Container>
        <Footer />
        </Router>
    );
}

export default App;
