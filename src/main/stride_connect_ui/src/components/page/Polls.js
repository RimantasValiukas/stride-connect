import {Button, Card, Col, FormText, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {deletePoll, getPolls} from "../../api/pollApi";
import LoadingCard from "../LoadingCard";
import DeleteButton from "../DeleteButton";

const Polls = () => {

    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPolls()
            .then(({data}) => {
                setPolls(data);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
        }, []);

    const deletePollById = (pollId) => {
        deletePoll(pollId)
            .then(() => window.location.reload())
            .catch((error) => console.log(error))
    }

    return(
        loading ? <LoadingCard/> :
        <div className="mb-2">
            <Row className="justify-content-center align-items-center">
                <Button href='/poll' size="lg" style={{backgroundColor: '#43535f', borderColor: '#43535f', marginBottom: '20px', maxWidth: '190px'}}>
                    Sukurti balsavimą
                </Button>
            </Row>

            <FormText style={{fontSize: '25px', marginBottom: '60px'}}>Aktyvūs balsavimai, atiduok savo balsą</FormText>

            <Row xs={1} md={1} className="g-4 mt-2" style={{maxWidth: '1000px'}}>
                {Array.from(polls).map((poll, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Card.Header className="ml-2 d-flex justify-content-start text-left" style={{backgroundColor: '#dcbc7c'}}><i>Balsavimas sukurtas:</i>&nbsp; {new Date(poll.date).toLocaleString()}, &nbsp;<i>Autorius:</i>&nbsp; Vardenis Pavardenis</Card.Header>
                            <Card.Body style={{backgroundColor: '#f3f3eb'}}>
                                <Card.Title>Balsavimo pavadinimas: {poll.name}</Card.Title>
                                <Card.Text className="mx-auto" style={{textAlign: 'justify'}}>
                                    {poll.description}
                                </Card.Text>
                                <Button href={`/polls/${poll.pollId}`} size="sm" style={{backgroundColor: '#9dab9d', borderColor: '#9dab9d'}}>Balsuoti</Button>
                                <DeleteButton deleteFunction={() => deletePollById(poll.pollId)} />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>


    );
}
export default Polls;