package lt.valiukas.stride_connect.articles.service;

import lt.valiukas.stride_connect.articles.dto.Article;
import lt.valiukas.stride_connect.articles.entity.ArticleEntity;
import lt.valiukas.stride_connect.articles.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public void saveArticle(Article article) {
        articleRepository.save(ArticleEntity.convert(article));
    }

    public List<Article> getArticles() {
        return articleRepository
                .findAll()
                .stream()
                .map(Article::convert)
                .toList();
    }

    public Article getArticleById(UUID articleId) {
        return articleRepository.findById(articleId).map(Article::convert).get();
    }

    public void deleteArticle(UUID articleId) {
        articleRepository.deleteById(articleId);
    }
}
