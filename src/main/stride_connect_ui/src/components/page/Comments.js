import {useEffect, useState} from "react";
import {getComments} from "../../api/articleApi";
import LoadingCard from "../LoadingCard";
import {Card, Col, Row} from "react-bootstrap";
import {format, parseISO} from "date-fns";

const Comments = ({articleId}) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getComments(articleId)
            .then(({data}) => {
                data.sort((a, b) => {
                    const dateA = parseISO(a.date);
                    const dateB = parseISO(b.date);
                    return dateB - dateA;
                });
                setComments(data);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    });

    return(
        loading ? <LoadingCard/> :
            <Row xs={1} md={1} lg={1} xl={1}>
                {Array.from(comments).map((comment, idx) => (
                    <Col key={idx}>
                        <Card style={{
                            maxWidth: '700px',
                            backgroundColor: '#f3f3eb',
                            marginBottom: '20px',
                            borderColor: '#f3f3eb'
                        }} className="mx-auto">
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted"
                                               style={{fontSize: '10px', textAlign: 'start'}}>{format(parseISO(comment.date), 'yyyy-MM-dd HH:mm')}
                                    &nbsp;Vartotojas: {comment.userFullName}</Card.Subtitle>
                                <Card.Text style={{textAlign: 'justify'}}>
                                    {comment.text}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
    );
}

export default Comments;