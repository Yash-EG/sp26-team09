package com.team09.demo.repository;

import com.team09.demo.entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
    List<PostComment> findByPost_PostIdOrderByCreatedAtAsc(Long postId);
}
