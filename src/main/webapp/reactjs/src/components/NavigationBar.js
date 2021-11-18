import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBar extends React.Component {
    render(){
        return(

            <Navbar bg="dark" variant="dark">
                <Link className="navbar-brand" to="/">Home</Link>

                    <Nav className="mr-auto">
                        <Link to="/events" className="nav-link">Events</Link>
                    </Nav>
                <Nav className="navbar-right">
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/registerplayer" className="nav-link">Register</Link>
                </Nav>
            </Navbar>
        );
    }
}

export default  NavigationBar;