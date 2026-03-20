package com.team09.demo.controller;

import com.team09.demo.entity.Band;
import com.team09.demo.service.BandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bands")
public class BandController {

    @Autowired
    private BandService bandService;

    // POST /bands — Create band profile
    @PostMapping
    public Band createBand(@RequestBody Band band) {
        return bandService.createBand(band);
    }

    // GET /bands — Get all bands
    @GetMapping
    public List<Band> getAllBands() {
        return bandService.getAllBands();
    }

    // GET /bands/{id} — Get band by ID
    @GetMapping("/{id}")
    public ResponseEntity<Band> getBandById(@PathVariable Long id) {
        return bandService.getBandById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT /bands/{id} — Update band profile
    @PutMapping("/{id}")
    public Band updateBand(@PathVariable Long id, @RequestBody Band bandDetails) {
        return bandService.updateBand(id, bandDetails);
    }

    // DELETE /bands/{id} — Delete band
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBand(@PathVariable Long id) {
        bandService.deleteBand(id);
        return ResponseEntity.noContent().build();
    }

    // GET /bands/genre/{genre} — Get bands by genre
    @GetMapping("/genre/{genre}")
    public List<Band> getBandsByGenre(@PathVariable String genre) {
        return bandService.getBandsByGenre(genre);
    }
}
