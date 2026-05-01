package com.team09.demo.service;

import com.team09.demo.entity.Post;
import com.team09.demo.entity.PostComment;
import com.team09.demo.repository.PostCommentRepository;
import com.team09.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostCommentService {

    @Autowired
    private PostCommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    public List<PostComment> getComments(Long postId) {
        return commentRepository.findByPost_PostIdOrderByCreatedAtAsc(postId);
    }

    public PostComment addComment(Long postId, Long customerId, String authorName, String text) {
        if (text == null || text.isBlank()) throw new RuntimeException("Comment cannot be empty");
        if (text.length() > 280) throw new RuntimeException("Comment exceeds 280 characters");

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        PostComment comment = new PostComment();
        comment.setPost(post);
        comment.setCustomerId(customerId);
        comment.setAuthorName(authorName);
        comment.setText(text.trim());
        return commentRepository.save(comment);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
