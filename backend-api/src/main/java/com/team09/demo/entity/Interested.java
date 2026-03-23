package com.team09.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "interested",
    uniqueConstraints = @UniqueConstraint(columnNames = {"customer_id", "show_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Interested {
    // Primary key for Interested
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many-to-one relationship to Customer and Show
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    // Many-to-one relationship to Show
    @ManyToOne
    @JoinColumn(name = "show_id", nullable = false)
    private Show show;

    // Timestamp for when it was marked interested
    private LocalDateTime interestedAt;
    


    
}
