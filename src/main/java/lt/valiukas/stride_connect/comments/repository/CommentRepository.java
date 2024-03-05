package lt.valiukas.stride_connect.comments.repository;

import lt.valiukas.stride_connect.comments.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<CommentEntity, UUID> {
    List<CommentEntity> findCommentEntitiesByArticleEntity_ArticleId(UUID articleId);
}
