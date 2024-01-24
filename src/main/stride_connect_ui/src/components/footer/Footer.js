import {CardLink, CardText, Col, Container, Row} from "react-bootstrap";
import {FaFacebook, FaInstagram} from "react-icons/fa";

const Footer = () => {

    return (
        <footer style={{backgroundColor: '#ddba7f', marginTop: 'auto'}} className="text-light mt-5 py-3">
            <Container style={{
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
            }}>
                <Row className="justify-content-center">
                    <Col className="text-center">
                        <CardLink href="https://www.facebook.com" className="text-light">
                            <FaFacebook style={{fontSize: 32, marginRight: '20px'}}/>
                        </CardLink>
                        <CardLink href="https://www.instagram.com" className="text-light">
                            <FaInstagram style={{fontSize: 32}}/>
                        </CardLink>
                        <CardText className="mb-3">
                            Running Community
                        </CardText>
                        <CardText>
                            Copyright ©
                            <CardLink href="https://strideconnect.com/" className="text-light" style={{textDecoration: 'none'}}>
                                StrideConnect
                            </CardLink>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </CardText>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;