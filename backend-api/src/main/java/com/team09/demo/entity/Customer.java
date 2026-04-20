package com.team09.demo.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name = "user_id")
public class Customer extends User {
    
    // Common user fields inherited from User (id, email, password, role)
    @Column(nullable = false)
    private String name;

    //User bio field with max length of 1000 characters
    @Column(length = 1000)
    private String bio;

    // Optional profile picture URL

    @Column()
    private String profilePictureUrl;

    // Optional location field
    @Column
    private String location;
    
    // Many-to-many relationship with Genre for preferred genres
    @ManyToMany
    @JoinTable(
        name = "customer_genres",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private java.util.Set<Genre> preferredGenres = new java.util.HashSet<>();

}
