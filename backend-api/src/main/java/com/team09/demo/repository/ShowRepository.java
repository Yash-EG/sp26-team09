package com.team09.demo.repository;

import com.team09.demo.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {
    List<Show> findByBandUserId(Long bandId);
    List<Show> findByGenre(String genre);
    List<Show> findByShowStatus(String showStatus);
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/main
