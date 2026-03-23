package com.team09.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    // Primary key for User
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    // Email must be unique and not null
    @Column(nullable = false, unique = true)
    private String email;

    // Password hash must be not null
    @Column(nullable = false)
    private String passwordHash;

    // Name must be not null
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    // Status must be not null
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserStatus status;

    
}
// Enums for UserRole and UserStatus
enum UserRole {
    CUSTOMER,
    BAND
}
// Enums for UserStatus
enum UserStatus {
    ACTIVE,
    INACTIVE,
    SUSPENDED
}