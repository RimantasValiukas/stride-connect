import HTTP from "./index";

const login = (data) => HTTP.post('/api/login', data);

export {
    login
}