import React from "react";
import {Col, Container, Navbar, Row} from "react-bootstrap";

class Footer extends React.Component{
    render() {
        let fullYear = new Date().getFullYear();
        return (

            <Navbar fixed={"bottom"} bg={"dark"} variant={"dark"}>
                <Container>

                    <Row>
                        <Col lg={12} className={"jumbotron text-center text-muted"}>
                            <div className="text-center">{fullYear}-{fullYear+1} All Right Reserved</div>
                        </Col>
                    </Row>

                </Container>
            </Navbar>
        );
    }
}

export default Footer;