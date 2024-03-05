package lt.valiukas.stride_connect.comments;

import lt.valiukas.stride_connect.comments.dto.Comment;
import lt.valiukas.stride_connect.comments.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(value = "/{articleId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Comment> getCommentsByArticleId(@PathVariable UUID articleId) {
        return commentService.getCommentsByArticleId(articleId);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Comment getComment(@PathVariable UUID commentId) {
        return commentService.getCommentById(commentId);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createComment(@RequestBody Comment comment) {
        commentService.saveComment(comment);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping(value = "/update" ,consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateComment(@RequestBody Comment comment) {
        commentService.saveComment(comment);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value = "/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable UUID commentId) {
        commentService.deleteComment(commentId);
    }
}
