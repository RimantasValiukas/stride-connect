import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {deleteArticle, getArticleById} from "../../api/articleApi";
import LoadingCard from "../LoadingCard";
import {Alert, Card} from "react-bootstrap";
import {format, parseISO} from "date-fns";
import {useSelector} from "react-redux";
import DeleteButton from "../DeleteButton";
import Button from "react-bootstrap/Button";
import Comment from "../forms/Comment";

const ArticleDetails = () => {
    const {articleId} = useParams();
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({show: false, error: false});
    const user = useSelector(state => state.user.user);
    const navigation = useNavigate();
    const location = useLocation();
    const successMessage = location.state;

    const isUserCreator = (creatorId) => {
        if (creatorId == user.id) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (successMessage) {
            setMessage({show: true, error: false, variant: 'success', message: 'Straipsnis sėkmingai atnaujintas'})
        }

        getArticleById(articleId)
            .then(({data}) => {
                setArticle(data);
            })
            .catch((error) => {
                console.log(error);
                setMessage({
                    show: true,
                    error: true,
                    variant: 'danger',
                    message: 'Klaida užkraunant straipsnį'
                });
            })
            .finally(() => setLoading(false))
    }, []);

    const onDelete = () => {
        deleteArticle(articleId)
            .then(() => navigation("/articles"))
            .catch((error) => setMessage({
                show: true,
                error: true,
                variant: 'danger',
                message: 'Klaida, negalima ištrinti straipsnio'
            }))
    }


    return (
        loading ? <LoadingCard/> :
            <>
                {message.error ? <Alert className="mx-auto" show={message.show} variant={message.variant}
                                        style={{maxWidth: '400px'}}>
                        {message.message}
                    </Alert> :
                    <>
                        {message.show && !message.error && <Alert className="mx-auto" show={message.show} variant={message.variant}
                                style={{maxWidth: '400px'}}>
                            {message.message}
                        </Alert>}
                        <Card style={{
                            maxWidth: '700px',
                            backgroundColor: '#f3f3eb',
                            borderColor: '#f3f3eb'
                        }}>
                            <Card.Body>
                                <Card.Title style={{textAlign: 'start'}}>{article.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted" style={{
                                    textAlign: 'start',
                                    fontSize: '14px'
                                }}>{format(parseISO(article.date), 'yyyy-MM-dd HH:mm')}
                                    &nbsp;{article.userFullName}</Card.Subtitle>
                                <Card.Img variant="top" src={article.photoUrl} style={{marginTop: '10px'}}/>
                                <Card.Text style={{textAlign: 'justify', marginTop: '30px'}}>
                                    {article.text.split('\n').map((paragraph, index) => (
                                        <React.Fragment key={index}>
                                            {paragraph}
                                            <br/>
                                        </React.Fragment>
                                    ))}
                                </Card.Text>
                                {user && (user.roles.includes('ADMIN') || isUserCreator(article.userId)) &&
                                    <>
                                        <DeleteButton deleteFunction={() => onDelete()}/>
                                        <Button size="sm" variant="secondary" href={`/article/${articleId}`}
                                                style={{marginLeft: '10px'}}>
                                            KEISTI
                                        </Button>
                                    </>
                                }
                            </Card.Body>
                        </Card>
                        {user && <Comment articleId={articleId}/>}
                    </>
                }

            </>

    );

}

export default ArticleDetails;