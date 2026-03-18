package com.team09.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

//TODO: Add location field - it can be nullable
//TODO: Add field for profile picture URL
//TODO: Add description field for customer bio
//TODO: Add relationship for saved shows and favorite bands
//TODO: Add preferred genres field - it can be a comma-separated string for simplicity

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


}
