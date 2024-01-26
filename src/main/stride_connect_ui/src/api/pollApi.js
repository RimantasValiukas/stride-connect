import HTTP from "./index";

const createPoll = (poll) => HTTP.post('/api/polls/create', poll);

export {
    createPoll
}