package com.team09.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "genres")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Genre {
    // Primary key for Genre
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long genreId;
    // Genre name must be unique and not null
    @Column(nullable = false, unique = true)
    private String name;
}
