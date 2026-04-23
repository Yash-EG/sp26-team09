package com.team09.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team09.demo.entity.Interested;

@Repository
// Repository interface for Interested entity
public interface InterestedRepository extends JpaRepository<Interested, Long>{
    Optional<Interested> findByCustomer_UserIdAndShow_ShowId(Long customerId, Long showId);
    List<Interested> findByCustomer_UserId(Long customerId);
}
