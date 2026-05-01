package com.team09.demo.service;

import com.team09.demo.entity.Post;
import com.team09.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public List<Post> getPostsByBandId(Long bandId) {
        return postRepository.findByBand_UserIdOrderByCreatedAtDesc(bandId);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    public Post likePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        post.setLikeCount(post.getLikeCount() + 1);
        return postRepository.save(post);
    }

    public Post unlikePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        post.setLikeCount(Math.max(0, post.getLikeCount() - 1));
        return postRepository.save(post);
    }
}
