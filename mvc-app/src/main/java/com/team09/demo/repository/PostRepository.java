package com.team09.demo.repository;

import com.team09.demo.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByBand_UserIdOrderByCreatedAtDesc(Long bandId);
}
