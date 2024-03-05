package lt.valiukas.stride_connect.comments.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.valiukas.stride_connect.comments.entity.CommentEntity;

import java.sql.Timestamp;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Comment {
    private UUID commentId;
    private UUID userId;
    private UUID articleId;
    private String userFullName;
    private String text;
    private Timestamp date;

    public static Comment convert(CommentEntity entity) {
        return new Comment(
                entity.getCommentId(),
                entity.getUserId(),
                entity.getArticleId(),
                entity.getUserFullName(),
                entity.getText(),
                entity.getDate()
        );
    }

}
