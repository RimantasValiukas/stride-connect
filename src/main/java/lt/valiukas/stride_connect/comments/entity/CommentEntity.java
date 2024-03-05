package lt.valiukas.stride_connect.comments.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.valiukas.stride_connect.articles.entity.ArticleEntity;
import lt.valiukas.stride_connect.comments.dto.Comment;

import java.sql.Timestamp;
import java.util.UUID;

@Entity(name = "comments")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CommentEntity {
    @Id
    @GeneratedValue
    @Column(updatable = false)
    private UUID commentId;
    @Column
    private UUID userId;
    @Column(insertable = false, updatable = false)
    private UUID articleId;
    @Column
    String userFullName;
    @Column(length = 2000)
    private String text;
    @Column
    private Timestamp date;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "articleId")
    private ArticleEntity articleEntity;

    public static CommentEntity convert(Comment comment) {
        return new CommentEntity(
                comment.getCommentId(),
                comment.getUserId(),
                comment.getArticleId(),
                comment.getUserFullName(),
                comment.getText(),
                comment.getDate(),
                null
        );
    }



}
