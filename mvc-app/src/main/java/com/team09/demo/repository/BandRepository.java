package com.team09.demo.repository;

import com.team09.demo.entity.Band;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BandRepository extends JpaRepository<Band, Long> {
    Band findByEmail(String email);
    List<Band> findByGenre(String genre);
}
