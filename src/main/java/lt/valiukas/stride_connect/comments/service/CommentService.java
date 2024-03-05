package lt.valiukas.stride_connect.comments.service;

import lt.valiukas.stride_connect.articles.entity.ArticleEntity;
import lt.valiukas.stride_connect.articles.repository.ArticleRepository;
import lt.valiukas.stride_connect.comments.dto.Comment;
import lt.valiukas.stride_connect.comments.entity.CommentEntity;
import lt.valiukas.stride_connect.comments.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;

    public CommentService(CommentRepository commentRepository, ArticleRepository articleRepository) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
    }

    public List<Comment> getCommentsByArticleId(UUID articleId) {
        return commentRepository.findCommentEntitiesByArticleEntity_ArticleId(articleId).
                stream()
                .map(Comment::convert)
                .toList();
    }

    public Comment getCommentById(UUID commentId) {
        return commentRepository.findById(commentId)
                .map(Comment::convert)
                .get();
    }

    public void saveComment(Comment comment) {
        CommentEntity commentEntity = CommentEntity.convert(comment);
        commentEntity.setArticleEntity(articleRepository.getReferenceById(comment.getArticleId()));
        commentRepository.save(commentEntity);
    }

    public void deleteComment(UUID commentId) {
        commentRepository.deleteById(commentId);
    }

}
