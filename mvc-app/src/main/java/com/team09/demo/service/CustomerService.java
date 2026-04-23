package com.team09.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.team09.demo.repository.CustomerRepository;
import com.team09.demo.repository.GenreRepository;
import com.team09.demo.entity.Customer;
import com.team09.demo.entity.Genre;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;




@Service
/**
 * Service class for managing Customer entities. 
 */
public class CustomerService {
    // Autowire the CustomerRepository and GenreRepository to interact with the database
    @Autowired
    private CustomerRepository customerRepository;

    // Autowire GenreRepository to manage genres related to customers
    @Autowired
    private GenreRepository genreRepository;

    /**
     * Method to create a new customer profile
     * @param customer the customer to be created
     * @return the created customer
     */
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
    /**
     * Method to retrieve a customer by their ID
     * @param id the ID of the customer to retrieve
     * @return the retrieved customer
     */
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    /**
     * Method to retrieve all customers
     * @return the list of all customers
     */
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    /**
     * Method to update existing customers
     * @param id the ID of the customer to update
     * @param customerDetails the updated customer details
     * @return the updated customer
     */
    public Customer updateCustomer(Long id, Customer customerDetails){
        return customerRepository.findById(id).map(customer -> {
            if(customerDetails.getEmail() != null) {
                customer.setEmail(customerDetails.getEmail());
            }
            if(customerDetails.getName() != null) {
                customer.setName(customerDetails.getName());
            }
            if(customerDetails.getBio() != null) {
                customer.setBio(customerDetails.getBio());
            }
            if(customerDetails.getProfilePictureUrl() != null) {
                customer.setProfilePictureUrl(customerDetails.getProfilePictureUrl());
            }
            if(customerDetails.getLocation() != null) {
                customer.setLocation(customerDetails.getLocation());
            }
            return customerRepository.save(customer);
        }).orElseThrow(() -> new RuntimeException("Customer not found with id " + id));

    }

    /**
     * Method to delete a customer by their ID
     * @param id the ID of the customer to delete
     */
    public void deleteCustomer(Long id){
        customerRepository.deleteById(id);
    }

    /**
     * Method to retrieve a customer by their email address
     * @param email the email address of the customer to retrieve
     * @return the retrieved customer
     */
    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    /**
     * Method to set preferred genres for a customer
     * @param id the ID of the customer
     * @param genreIds the set of genre IDs to set as preferred
     * @return the updated customer
     */
    public Customer setCustomerPreferredGenres(Long id, Set<Long> genreIds) {
        return customerRepository.findById(id).map(customer -> {
            Set<Genre> genres = new HashSet<>(genreRepository.findAllById(genreIds));
            if(genres.size() != genreIds.size()) {
                throw new RuntimeException("One or more genres not found with provided IDs");
            }
            customer.setPreferredGenres(genres);
            return customerRepository.save(customer);
        }).orElseThrow(() -> new RuntimeException("Customer not found with id " + id));
    }
}
