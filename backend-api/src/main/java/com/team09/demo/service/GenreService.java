package com.team09.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.team09.demo.entity.Genre;
import com.team09.demo.repository.GenreRepository;
import java.util.List;
import java.util.Optional;

@Service
/**
 * Service class for managing Genre entities.
 */
public class GenreService {
    // Autowire GenreRepository to interact with the database
    @Autowired
    private GenreRepository genreRepository;

    /**
     * Method to create a new genre
     * @param genre the genre to be created
     * @return the created genre
     */
    public Genre createGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    /**
     * Method to retrieve all genres
     * @return the list of all genres
     */
    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    /**
     * Method to retrieve a genre by its ID
     * @param id the ID of the genre to retrieve
     * @return the retrieved genre
     */
    public Optional<Genre> getGenreById(Long id) {
        return genreRepository.findById(id);
    }

}
