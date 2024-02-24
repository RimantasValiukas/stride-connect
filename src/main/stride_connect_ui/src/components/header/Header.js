import {Button, Col, Container, Dropdown, Nav, Navbar, NavbarBrand, NavLink, Row} from "react-bootstrap";
import React from "react";
import logo from './logo.png';
import {FaRegUser, FaSignInAlt} from "react-icons/fa";
import {TbUsersPlus} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {TfiUser} from "react-icons/tfi";
import {removeUser} from "../../store/slices/userSlice";

const Header = (props) => {
    const sections = [
        {title: 'Pradžia', url: '/'},
        {title: 'Straipsniai', url: '/articles'},
        {title: 'Varžybos', url: '/'},
        {title: 'Apklausos', url: '/polls'}
    ];
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const onLogout = () => {
       dispatch(removeUser());
    }

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
                            {user ? <Dropdown>
                                <Dropdown.Toggle variant='light' style={{backgroundColor: '#f4f3eb', borderColor: '#f4f3eb'}}>
                                    <TfiUser/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>{user.fullName}</Dropdown.Item>
                                    <Dropdown.Item href="#/action">Nustatymai</Dropdown.Item>
                                    <Dropdown.Item onClick={onLogout} >Atsijungti</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> : <>
                                <Navbar.Brand>
                                    <NavLink href='/login' >
                                        <FaSignInAlt style={{width: '20px', height: '20px', marginLeft: '20px'}}/>
                                    </NavLink>
                                </Navbar.Brand>
                                <NavbarBrand>
                                    <NavLink href='/registration'>
                                        <TbUsersPlus style={{width: '20px', height: '20px'}}/>
                                    </NavLink>
                                </NavbarBrand>
                            </>}
                        </Container>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;