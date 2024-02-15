import HTTP from "./index";

const createPoll = (poll) => HTTP.post('/polls/create', poll);
const getPolls = () => HTTP.get("/polls");
const getPollById = (pollId) => HTTP.get(`/polls/${pollId}`);
const addVote = (pollId, vote) => HTTP.put(`/polls/update/${pollId}`, vote);
const deletePoll = (pollId) => HTTP.delete(`/polls/delete/${pollId}`);

export {
    createPoll,
    getPolls,
    getPollById,
    addVote,
    deletePoll
}