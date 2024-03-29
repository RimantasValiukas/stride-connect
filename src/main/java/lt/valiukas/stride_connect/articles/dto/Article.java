package lt.valiukas.stride_connect.articles.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.valiukas.stride_connect.articles.entity.ArticleEntity;

import java.sql.Timestamp;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Article {
    private UUID articleId;
    private UUID userId;
    private String userFullName;
    private String title;
    private String text;
    private String photoUrl;
    private Timestamp date;

    public static Article convert(ArticleEntity entity) {
        return new Article(
                entity.getArticleId(),
                entity.getUserId(),
                entity.getUserFullName(),
                entity.getTitle(),
                entity.getText(),
                entity.getPhotoUrl(),
                entity.getDate()
        );
    }


}
