import HTTP from "./index";

const createArticle = (article) => HTTP.post('/articles/create', article);
const getArticleById = (articleId) => HTTP.get(`/articles/${articleId}`);
const getAllArticles = () => HTTP.get('/articles');
const deleteArticle = (articleId) => HTTP.delete(`/articles/delete/${articleId}`);
const updateArticle = (article) => HTTP.put('/articles/update', article);
const createComment = (comment) => HTTP.post('/comments', comment);

export {
    createArticle,
    getArticleById,
    getAllArticles,
    deleteArticle,
    updateArticle,
    createComment
}