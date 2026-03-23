package com.team09.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bands")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name = "user_id")
public class Band extends User {

    @Column(nullable = false)
    private String name;

    private String genre;

    private String subgenre;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String contactName;

    private String phone;

    private Integer setLength;

    private Integer membersCount;

    @Column(columnDefinition = "TEXT")
    private String equipment;

    private Double rate;

    private String website;

    private String instagram;

    private String spotify;

    private String soundcloud;
}