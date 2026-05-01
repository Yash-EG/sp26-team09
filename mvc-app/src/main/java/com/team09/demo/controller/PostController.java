package com.team09.demo.controller;

import com.team09.demo.entity.Post;
import com.team09.demo.entity.PostComment;
import com.team09.demo.service.PostCommentService;
import com.team09.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostCommentService commentService;

    // POST /posts — Create a post
    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    // GET /posts — Get all posts
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // GET /posts/{id} — Get post by ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /posts/band/{bandId} — Get all posts by a band
    @GetMapping("/band/{bandId}")
    public List<Post> getPostsByBand(@PathVariable Long bandId) {
        return postService.getPostsByBandId(bandId);
    }

    // DELETE /posts/{id} — Delete a post
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    // POST /posts/{id}/like — Like a post (increment count)
    @PostMapping("/{id}/like")
    public Post likePost(@PathVariable Long id) {
        return postService.likePost(id);
    }

    // DELETE /posts/{id}/like — Unlike a post (decrement count)
    @DeleteMapping("/{id}/like")
    public Post unlikePost(@PathVariable Long id) {
        return postService.unlikePost(id);
    }

    // GET /posts/{id}/comments — Get comments for a post
    @GetMapping("/{id}/comments")
    public List<PostComment> getComments(@PathVariable Long id) {
        return commentService.getComments(id);
    }

    // POST /posts/{id}/comments — Add a comment
    @PostMapping("/{id}/comments")
    public ResponseEntity<?> addComment(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        try {
            Long customerId = body.get("customerId") != null ? Long.valueOf(body.get("customerId").toString()) : null;
            String authorName = (String) body.get("authorName");
            String text = (String) body.get("text");
            PostComment comment = commentService.addComment(id, customerId, authorName, text);
            return ResponseEntity.ok(comment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // DELETE /posts/{id}/comments/{commentId} — Delete a comment
    @DeleteMapping("/{id}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id, @PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
