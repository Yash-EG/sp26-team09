package com.team09.demo.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

//TODO: Add relationship for saved shows and favorite bands
@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name = "user_id")
public class Customer extends User {
    
    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String bio;

    @Column
    private String profilePictureUrl;

    @Column
    private String location;
    
    @ManyToMany
    @JoinTable(
        name = "customer_genres",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private java.util.Set<Genre> preferredGenres = new java.util.HashSet<>();

}
