package com.team09.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team09.demo.entity.Follow;

@Repository

public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findByCustomer_UserId(Long customerId);
    Optional<Follow> findByCustomer_UserIdAndBand_UserId(Long customerId, Long bandId);
}
