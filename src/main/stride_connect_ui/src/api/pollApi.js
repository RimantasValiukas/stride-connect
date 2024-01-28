import HTTP from "./index";

const createPoll = (poll) => HTTP.post('/api/polls/create', poll);
const getPolls = () => HTTP.get("/api/polls");

export {
    createPoll,
    getPolls
}