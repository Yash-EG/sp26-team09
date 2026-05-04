package com.team09.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.team09.demo.entity.Customer;


// Repository interface for Customer entity
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Must use JPQL against the entity (not native SQL) because email is on
    // the parent User table via JOINED inheritance — Spring Data's derived
    // findByEmail would query customers table directly and always return null.
    @Query("SELECT c FROM Customer c WHERE c.email = :email")
    Customer findByEmail(@Param("email") String email);
}
