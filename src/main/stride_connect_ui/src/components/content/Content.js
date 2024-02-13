import {CardText, Container} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import Poll from "../forms/Poll";
import Polls from "../page/Polls";
import PollDetails from "../page/PollDetails";
import Login from "../forms/Login";
import Registration from "../forms/Registration";

const Content = () => {

    return(
        <Container className="d-flex flex-column align-items-center justify-content-center text-center mx-auto">
            <Routes>
                <Route path={'/poll'} element={<Poll/>}/>
                <Route path={'/polls'} element={<Polls/>}/>
                <Route path={'/polls/:pollId'} element={<PollDetails/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>

            </Routes>
        </Container>
    );
}

export default Content;