package com.team09.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "shows")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long showId;

    @ManyToOne
    @JoinColumn(name = "band_id", nullable = false)
    private Band band;

    private Double ticketPrice;

    private String image;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    private String venueAddress;

    private LocalDate date;

    private LocalTime doorsTime;

    private LocalTime showTime;

    private String genre;

    private String ageRestriction;

    @Column(columnDefinition = "TEXT")
    private String lineup;

    private String showStatus;
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/main
