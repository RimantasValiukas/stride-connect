import HTTP from "./index";

const createPoll = (poll) => HTTP.post('/api/polls/create', poll);
const getPolls = () => HTTP.get("/api/polls");
const getPollById = (pollId) => HTTP.get(`/api/polls/${pollId}`);
const addVote = (pollId, option) => HTTP.put(`/api/polls/update/${pollId}`, option);

export {
    createPoll,
    getPolls,
    getPollById,
    addVote
}