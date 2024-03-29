import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {addVote, getPollById} from "../../api/pollApi";
import {Card, Form, Button, Col, Row, Alert} from "react-bootstrap";
import Donut from "../Donut";
import LoadingCard from "../LoadingCard";
import {useSelector} from "react-redux";


const PollDetails = () => {
    const [pollData, setPollData] = useState({
        options: []
    });
    const {pollId} = useParams();
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState("");
    const [message, setMessage] = useState({show: false, error: false});
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if (!user) {
            setMessage({
                show: true,
                error: false,
                variant: 'info',
                message: 'Balsuoti gali tik prisijungę vartotojai'
            })
        }

        getPollById(pollId)
            .then(({data}) => {
                const poll = {
                    ...data,
                    options: getOptions(data.variants)
                }

                setPollData(poll);

                if (user && poll.votedUsers.includes(user.id)) {
                    setMessage({
                        show: true,
                        error: false,
                        variant: 'info',
                        message: 'Jūs jau balsavote, balsuoti galima tik vieną kartą'
                    })
                }
            })
            .catch((error) => {
                setMessage({
                    show: true,
                    error: true,
                    variant: 'danger',
                    message: 'Klaida užkraunant duomenis'
                })
                console.log(error)
            })
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
        const vote = {
            option: selectedOption,
            userId: user.id
        }
        addVote(pollId, vote)
            .then(() => window.location.reload())
            .catch((error) => console.log(error))
    }


    return (
        loading ? <LoadingCard/> :
            <div className="mb-2">
                <Row className="justify-content-center align-items-center">
                    <Col>
                        {message.error ? <Alert className="mx-auto" show={message.show} variant={message.variant}
                                                style={{maxWidth: '400px'}}>
                                {message.message}
                            </Alert> :
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
                                    {message.show ?
                                        <Alert className="mx-auto" show={message.show} variant={message.variant}
                                               style={{maxWidth: '400px'}}>
                                            {message.message}
                                        </Alert> :
                                        <Form onSubmit={handleSubmit}>
                                            {pollData.options.map((option, index) => (
                                                <Form.Group controlId={`radio-${index}`} key={index} className="mb-1"
                                                            style={{
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
                                    }
                                </Card.Body>
                            </Card>}
                    </Col>
                </Row>
                <Donut pollOptions={pollData.options}/>
            </div>

    );

}

export default PollDetails;