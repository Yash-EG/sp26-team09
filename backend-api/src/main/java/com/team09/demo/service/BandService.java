package com.team09.demo.service;

import com.team09.demo.entity.Band;
import com.team09.demo.repository.BandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BandService {

    @Autowired
    private BandRepository bandRepository;

    public Band createBand(Band band) {
        return bandRepository.save(band);
    }

    public Optional<Band> getBandById(Long id) {
        return bandRepository.findById(id);
    }

    public List<Band> getAllBands() {
        return bandRepository.findAll();
    }

    public Band updateBand(Long id, Band bandDetails) {
        return bandRepository.findById(id).map(band -> {
            if (bandDetails.getEmail() != null) band.setEmail(bandDetails.getEmail());
            if (bandDetails.getName() != null) band.setName(bandDetails.getName());
            if (bandDetails.getGenre() != null) band.setGenre(bandDetails.getGenre());
            if (bandDetails.getSubgenre() != null) band.setSubgenre(bandDetails.getSubgenre());
            if (bandDetails.getBio() != null) band.setBio(bandDetails.getBio());
            if (bandDetails.getContactName() != null) band.setContactName(bandDetails.getContactName());
            if (bandDetails.getPhone() != null) band.setPhone(bandDetails.getPhone());
            if (bandDetails.getSetLength() != null) band.setSetLength(bandDetails.getSetLength());
            if (bandDetails.getMembersCount() != null) band.setMembersCount(bandDetails.getMembersCount());
            if (bandDetails.getEquipment() != null) band.setEquipment(bandDetails.getEquipment());
            if (bandDetails.getRate() != null) band.setRate(bandDetails.getRate());
            if (bandDetails.getWebsite() != null) band.setWebsite(bandDetails.getWebsite());
            if (bandDetails.getInstagram() != null) band.setInstagram(bandDetails.getInstagram());
            if (bandDetails.getSpotify() != null) band.setSpotify(bandDetails.getSpotify());
            if (bandDetails.getSoundcloud() != null) band.setSoundcloud(bandDetails.getSoundcloud());
            return bandRepository.save(band);
        }).orElseThrow(() -> new RuntimeException("Band not found with id " + id));
    }

    public void deleteBand(Long id) {
        bandRepository.deleteById(id);
    }

    public Band getBandByEmail(String email) {
        return bandRepository.findByEmail(email);
    }

    public List<Band> getBandsByGenre(String genre) {
        return bandRepository.findByGenre(genre);
    }
}