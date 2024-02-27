import {Alert, Button, Card, Col, Container, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllArticles} from "../../api/articleApi";
import LoadingCard from "../LoadingCard";
import {format, parseISO} from "date-fns";

const Articles = () => {
    const user = useSelector(state => state.user.user);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({show: false, error: false});

    useEffect(() => {
        getAllArticles()
            .then(({data}) => {
                data.sort((a, b) => {
                    const dateA = parseISO(a.date);
                    const dateB = parseISO(b.date);
                    return dateB - dateA;
                });
                setArticles(data);
            })
            .catch((error) => {
                console.log(error);
                setMessage({
                    show: true,
                    error: true,
                    variant: 'danger',
                    message: 'Klaida užkraunant duomenis'
                })
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        loading ? <LoadingCard/> :
            <>
                {user &&
                    <Row className="justify-content-center align-items-center">
                        <Col>
                            <Button href='/article' size="lg" style={{
                                backgroundColor: '#43535f',
                                borderColor: '#43535f',
                                marginBottom: '20px',
                                maxWidth: '190px'
                            }}>
                                Sukurti straipsnį
                            </Button>
                        </Col>
                    </Row>
                }
                {message.error ? <Alert className="mx-auto" show={message.show} variant={message.variant}
                                        style={{maxWidth: '400px'}}>
                        {message.message}
                    </Alert> :
                    <Row xs={1} md={2} lg={3} xl={3} style={{maxWidth: '1080px'}}>
                        {Array.from(articles).map((article, idx) => (
                            <Col key={idx}>
                                <Card style={{
                                    width: '20rem',
                                    backgroundColor: '#f3f3eb',
                                    marginBottom: '20px',
                                    borderColor: '#f3f3eb'
                                }} className="mx-auto">
                                    <Card.Img variant="top" src={article.photoUrl} style={{maxHeight: '200px'}}/>
                                    <Card.Body>
                                        <Card.Title>{article.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"
                                                       style={{fontSize: '10px'}}>{format(parseISO(article.date), 'yyyy-MM-dd HH:mm')}
                                            &nbsp;{article.userFullName}</Card.Subtitle>
                                        <Card.Text style={{textAlign: 'justify'}}>
                                            {article.text.length > 250 && article.text.slice(0, 250) + '...'}
                                            <Card.Link href={`/articles/${article.articleId}`}>skaityti
                                                toliau</Card.Link>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                }
            </>
    );
}

export default Articles;