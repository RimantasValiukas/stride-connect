package lt.valiukas.stride_connect.articles;

import lt.valiukas.stride_connect.articles.dto.Article;
import lt.valiukas.stride_connect.articles.service.ArticleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Article> getAllArticles() {
        return articleService.getArticles();
    }

    @GetMapping(value = "/{articleId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Article getArticleById(@PathVariable UUID articleId) {
        return articleService.getArticleById(articleId);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createArticle(@RequestBody Article article) {
        articleService.saveArticle(article);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value = "/delete/{articleId}")
    @ResponseStatus(HttpStatus.GONE)
    public void deleteArticle(@PathVariable UUID articleId) {
        articleService.deleteArticle(articleId);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping(value = "/update/", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateArticle(@RequestBody Article article) {
        articleService.saveArticle(article);
    }


}
