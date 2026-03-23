package com.team09.demo.service;

import com.team09.demo.entity.Show;
import com.team09.demo.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShowService {

    @Autowired
    private ShowRepository showRepository;

    public Show createShow(Show show) {
        return showRepository.save(show);
    }

    public Optional<Show> getShowById(Long id) {
        return showRepository.findById(id);
    }

    public List<Show> getAllShows() {
        return showRepository.findAll();
    }

    public List<Show> getShowsByBandId(Long bandId) {
        return showRepository.findByBandUserId(bandId);
    }

    public List<Show> getShowsByGenre(String genre) {
        return showRepository.findByGenre(genre);
    }

    public Show updateShow(Long id, Show showDetails) {
        return showRepository.findById(id).map(show -> {
            if (showDetails.getTicketPrice() != null) show.setTicketPrice(showDetails.getTicketPrice());
            if (showDetails.getImage() != null) show.setImage(showDetails.getImage());
            if (showDetails.getDescription() != null) show.setDescription(showDetails.getDescription());
            if (showDetails.getLocation() != null) show.setLocation(showDetails.getLocation());
            if (showDetails.getVenueAddress() != null) show.setVenueAddress(showDetails.getVenueAddress());
            if (showDetails.getDate() != null) show.setDate(showDetails.getDate());
            if (showDetails.getDoorsTime() != null) show.setDoorsTime(showDetails.getDoorsTime());
            if (showDetails.getShowTime() != null) show.setShowTime(showDetails.getShowTime());
            if (showDetails.getGenre() != null) show.setGenre(showDetails.getGenre());
            if (showDetails.getAgeRestriction() != null) show.setAgeRestriction(showDetails.getAgeRestriction());
            if (showDetails.getLineup() != null) show.setLineup(showDetails.getLineup());
            if (showDetails.getShowStatus() != null) show.setShowStatus(showDetails.getShowStatus());
            return showRepository.save(show);
        }).orElseThrow(() -> new RuntimeException("Show not found with id " + id));
    }

    public void deleteShow(Long id) {
        showRepository.deleteById(id);
    }
}