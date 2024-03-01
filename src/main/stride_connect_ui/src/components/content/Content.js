import {CardText, Container} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import Poll from "../forms/Poll";
import Polls from "../page/Polls";
import PollDetails from "../page/PollDetails";
import Login from "../forms/Login";
import Registration from "../forms/Registration";
import SecuredRoute from "../security/SecuredRoute";
import Articles from "../page/Articles";
import Article from "../forms/Article";
import ArticleDetails from "../page/ArticleDetails";

const Content = () => {

    return(
        <Container className="d-flex flex-column align-items-center justify-content-center text-center mx-auto">
            <Routes>
                <Route path={'/poll'} element={<SecuredRoute roles={['USER']}/>}>
                    <Route path={'/poll'} element={<Poll/>}/>
                </Route>
                <Route path={'/polls'} element={<Polls/>}/>
                <Route path={'/polls/:pollId'} element={<PollDetails/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/articles'} element={<Articles/>}/>
                <Route path={'/article'} element={<SecuredRoute roles={['USER']}/>}>
                    <Route path={'/article'} element={<Article/>}/>
                </Route>
                <Route path={'/articles/:articleId'} element={<ArticleDetails/>}/>
                <Route path={'/article/:articleId'} element={<SecuredRoute roles={['USER']}/>}>
                    <Route path={'/article/:articleId'} element={<Article/>}/>
                </Route>
            </Routes>
        </Container>
    );
}

export default Content;