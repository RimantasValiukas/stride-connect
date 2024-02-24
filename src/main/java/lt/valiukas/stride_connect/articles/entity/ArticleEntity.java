package lt.valiukas.stride_connect.articles.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.valiukas.stride_connect.articles.dto.Article;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ArticleEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false)
    private UUID articleId;
    @Column
    private UUID userId;
    @Column(length = 5000)
    private String title;
    @Column
    private String photoUrl;
    @Column
    private Timestamp date;

    public static ArticleEntity convert(Article article) {
        return new ArticleEntity(
                article.getArticleId(),
                article.getUserId(),
                article.getTitle(),
                article.getPhotoUrl(),
                article.getDate()
        );
    }
}
