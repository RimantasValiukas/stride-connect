import HTTP from "./index";

const createPoll = (poll) => HTTP.post('/polls/create', poll);
const getPolls = () => HTTP.get("/polls");
const getPollById = (pollId) => HTTP.get(`/polls/${pollId}`);
const addVote = (pollId, option) => HTTP.put(`/polls/update/${pollId}`, option);
const deletePoll = (pollId) => HTTP.delete(`/polls/delete/${pollId}`);

export {
    createPoll,
    getPolls,
    getPollById,
    addVote,
    deletePoll
}