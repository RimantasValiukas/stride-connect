import HTTP from "./index";

const createArticle = (article) => HTTP.post('/articles/create', article);
const getArticleById = (articleId) => HTTP.post(`/article/${articleId}`);

export {
    createArticle,
    getArticleById
}