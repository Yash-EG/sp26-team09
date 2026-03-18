package com.team09.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.team09.demo.repository.CustomerRepository;

import com.team09.demo.entity.Customer;

import java.util.List;
import java.util.Optional;


//TODO: Add to updateCustomer to have description, profilePictureURL, location, preferredGenres
//TODO: Add logic for bookmarking/saving shows and following bands


@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer updateCustomer(Long id, Customer customerDetails){
        return customerRepository.findById(id).map(customer -> {
            if(customerDetails.getEmail() != null) {
                customer.setEmail(customerDetails.getEmail());
            }
            if(customerDetails.getName() != null) {
                customer.setName(customerDetails.getName());
            }
            return customerRepository.save(customer);
        }).orElseThrow(() -> new RuntimeException("Customer not found with id " + id));

    }

    public void deleteCustomer(Long id){
        customerRepository.deleteById(id);
    }

    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email);
    }
}
