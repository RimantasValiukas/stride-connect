import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {addVote, getPollById} from "../../api/pollApi";
import {Card, Form, Button, Col, Row} from "react-bootstrap";
import Donut from "../Donut";
import LoadingCard from "../LoadingCard";


const PollDetails = () => {
    const [pollData, setPollData] = useState({
        options: []
    });
    const {pollId} = useParams();
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        getPollById(pollId)
            .then(({data}) => {
                const poll = {
                    ...data,
                    options: getOptions(data.variants)
                }

                setPollData(poll);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }, []);

    const getOptions = (data) => {
        const options = [];

        Object.entries(data).map(([key, value]) => (
            options.push({text: key, votes: value})
        ))

        return options;
    }

    const handleSubmit = (event) => {
        addVote(pollId, {option: selectedOption})
            .then(() => window.location.reload())
            .catch((error) => console.log(error))
    }


    return (
        loading ? <LoadingCard/> :
        <div className="mb-2">
            <Row xs={1} md={1} className="justify-content-center align-items-center">
                <Col>
                    <Card>
                        <Card.Header className="ml-2 d-flex justify-content-start text-left"
                                     style={{backgroundColor: '#dcbc7c'}}><i>Balsavimas
                            sukurtas:</i>&nbsp; {new Date(pollData.date).toLocaleString()}, &nbsp; <i>Galioja
                            iki:</i>&nbsp; {new Date(pollData.expirationDate).toLocaleString()} &nbsp;
                            <i>Autorius:</i>&nbsp; Vardenis Pavardenis</Card.Header>
                        <Card.Body style={{backgroundColor: '#f3f3eb'}}>
                            <Card.Title>Balsavimo pavadinimas: {pollData.name}</Card.Title>
                            <Card.Text className="mx-auto" style={{maxWidth: '700px', textAlign: 'justify'}}>
                                {pollData.description}
                            </Card.Text>
                            <Form onSubmit={handleSubmit}>
                                {pollData.options.map((option, index) => (
                                    <Form.Group controlId={`radio-${index}`} key={index} className="mb-1" style={{
                                        display: 'flex',
                                        marginLeft: '45%'
                                    }}>
                                        <Form.Check
                                            type="radio"
                                            label={option.text}
                                            checked={selectedOption === option.text}
                                            onChange={() => setSelectedOption(option.text)}
                                        />
                                    </Form.Group>
                                ))}
                                <Button type="submit" size="sm" style={{
                                    backgroundColor: '#9dab9d',
                                    borderColor: '#9dab9d',
                                    marginTop: '20px'
                                }}>Balsuoti</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Donut pollOptions={pollData.options}/>
        </div>

    );

}

export default PollDetails;