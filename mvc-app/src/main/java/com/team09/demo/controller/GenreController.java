package com.team09.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.team09.demo.entity.Genre;
import com.team09.demo.service.GenreService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/genres")
public class GenreController {
    
    @Autowired
    private GenreService genreService;

    // POST /genres — Create new genre
    @PostMapping
    public ResponseEntity<Genre> createGenre(@RequestBody Genre genre) {
        Genre createdGenre = genreService.createGenre(genre);
        return ResponseEntity.status(201).body(createdGenre);
    }

    // GET /genres — Get all genres
    @GetMapping
    public ResponseEntity<List<Genre>> getAllGenres() {
        return ResponseEntity.ok(genreService.getAllGenres());
    }
}
