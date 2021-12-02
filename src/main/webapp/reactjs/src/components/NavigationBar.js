import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {faTrophy, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class NavigationBar extends React.Component {
    render(){
        return(

            <Navbar bg="dark" variant="dark">
                <Link className="navbar-brand" to="/"><FontAwesomeIcon icon={faTrophy}/></Link>

                    <Nav className="mr-auto">
                        <Link to="/events" className="nav-link">Events</Link>
                    </Nav>
                <Nav className="navbar-right">
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register/player" className="nav-link">Register as Player</Link>
                    <Link to="/register/organizer" className="nav-link">Register as Organizer</Link>
                    <Link to="/players" className="nav-link">Players (ADMIN)</Link>
                    <Link to="/organizers" className="nav-link">Organizers (ADMIN)</Link>
                </Nav>
            </Navbar>
        );
    }
}

export default  NavigationBar;