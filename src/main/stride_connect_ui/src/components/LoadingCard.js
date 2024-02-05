import {Card, Col, Container, Placeholder, Row} from "react-bootstrap";

const LoadingCard = () => {

    return(
        <Container>
            <Row xs={1} md={1} className="g-4 mt-2">
                <Col>
                    <Card style={{ width: 'auto' }}>
                        <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                            <Placeholder.Button style={{backgroundColor: '#9dab9d', borderColor: '#9dab9d'}} xs={6} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>


    );

}

export default LoadingCard;