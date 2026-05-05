package com.team09.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne
    @JoinColumn(name = "band_id", nullable = false)
    private Band band;

    @Column(columnDefinition = "TEXT")
    private String caption;

    private String imageUrl;

    private LocalDateTime createdAt;

    @Column(columnDefinition = "integer default 0")
    private Integer likeCount = 0;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (likeCount == null) likeCount = 0;
    }
}
