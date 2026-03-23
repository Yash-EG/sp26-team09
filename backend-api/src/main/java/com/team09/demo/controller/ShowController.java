package com.team09.demo.controller;

import com.team09.demo.entity.Show;
import com.team09.demo.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shows")
public class ShowController {

    @Autowired
    private ShowService showService;

    // POST /shows — Create a new show (Band creates a service)
    @PostMapping
    public Show createShow(@RequestBody Show show) {
        return showService.createShow(show);
    }

    // GET /shows — Get all shows
    @GetMapping
    public List<Show> getAllShows() {
        return showService.getAllShows();
    }

    // GET /shows/{id} — Get show by ID
    @GetMapping("/{id}")
    public ResponseEntity<Show> getShowById(@PathVariable Long id) {
        return showService.getShowById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /shows/band/{bandId} — Get all shows by a specific band (view band's services)
    @GetMapping("/band/{bandId}")
    public List<Show> getShowsByBand(@PathVariable Long bandId) {
        return showService.getShowsByBandId(bandId);
    }

    // GET /shows/genre/{genre} — Get shows by genre
    @GetMapping("/genre/{genre}")
    public List<Show> getShowsByGenre(@PathVariable String genre) {
        return showService.getShowsByGenre(genre);
    }

    // PUT /shows/{id} — Update a show
    @PutMapping("/{id}")
    public Show updateShow(@PathVariable Long id, @RequestBody Show showDetails) {
        return showService.updateShow(id, showDetails);
    }

    // DELETE /shows/{id} — Delete a show (admin moderation)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShow(@PathVariable Long id) {
        showService.deleteShow(id);
        return ResponseEntity.noContent().build();
    }
}
