import HTTP from "./index";

const createArticle = (article) => HTTP.post('/articles/create', article);
const getArticleById = (articleId) => HTTP.get(`/article/${articleId}`);
const getAllArticles = () => HTTP.get('/articles');

export {
    createArticle,
    getArticleById,
    getAllArticles
}