package com.team09.demo.repository;

import org.springframework.stereotype.Repository;

import com.team09.demo.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
    Genre findByName(String name);
}
