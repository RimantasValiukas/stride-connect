import HTTP from "./index";

const login = (data) => HTTP.post('/login', data);
const registration = (user) => HTTP.post('/registration', user);

export {
    login,
    registration
}