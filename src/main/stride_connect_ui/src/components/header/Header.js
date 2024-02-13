import {Button, Col, Container, Nav, Navbar, NavLink, Row} from "react-bootstrap";
import React from "react";
import logo from './logo.png';
import {FaSignInAlt} from "react-icons/fa";

const Header = (props) => {
    const {sections} = props;

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center">
            <Row>
                <Col>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{height: '195px'}}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Navbar bg="#f4f3eb" variant="light" expand="lg" className="mb-3">
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto">
                                    {sections.map((section) => (
                                        <Nav.Link
                                            key={section.title}
                                            href={section.url}
                                            className="mr-3"
                                            style={{color: '#31503a', fontWeight: 'bold'}}
                                        >
                                            {section.title}
                                        </Nav.Link>
                                    ))}
                                </Nav>
                            </Navbar.Collapse>
                            <Navbar.Brand className="ml-auto">
                                <NavLink href='/login' >
                                    <FaSignInAlt style={{width: '20px', height: '20px', marginLeft: '20px'}}/>
                                </NavLink>
                            </Navbar.Brand>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;