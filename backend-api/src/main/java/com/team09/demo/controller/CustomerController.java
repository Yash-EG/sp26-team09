package com.team09.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.team09.demo.entity.Band;
import com.team09.demo.entity.Customer;
import com.team09.demo.entity.Show;
import com.team09.demo.service.CustomerService;
import com.team09.demo.service.FollowService;
import com.team09.demo.service.InterestedService;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private FollowService followService;

    @Autowired
    private InterestedService interestedService;

    // POST /customers — Create customer profile
    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Customer createdCustomer = customerService.createCustomer(customer);
        return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
    }

    // POST /customers/{id}/follow/{bandId} — Follow a band
    @PostMapping("/{id}/follow/{bandId}")
    public ResponseEntity<Void> followBand(@PathVariable Long id, @PathVariable Long bandId) {
        try {
            followService.followBand(id, bandId);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (RuntimeException e) {
            System.out.println("Error following band: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    // POST /customers/{id}/interested/{showId} — Mark show as interested
    @PostMapping("/{id}/interested/{showId}")
    public ResponseEntity<Void> markInterested(@PathVariable Long id, @PathVariable Long showId) {
        try {
            interestedService.markInterested(id, showId);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (RuntimeException e) {
            System.out.println("Error marking interested: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // GET /customers — Get all customers
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    // GET /customers/{id} — Get customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Optional<Customer> customer = customerService.getCustomerById(id);
        return customer.map(c -> new ResponseEntity<>(c, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // GET /customers/email/{email} — Get customer by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Customer> getCustomerByEmail(@PathVariable String email) {
        Customer customer = customerService.getCustomerByEmail(email);
        return customer != null ? new ResponseEntity<>(customer, HttpStatus.OK)
        : new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    // GET /customers/{id}/following — Get bands followed by customer
    @GetMapping("/{id}/following")
    public ResponseEntity<List<Band>> getFollowedBands(@PathVariable Long id) {
            List<Band> followedBands = followService.getFollowedBands(id);
            return new ResponseEntity<>(followedBands, HttpStatus.OK);
            
    }

    // GET /customers/{id}/interested — Get shows marked as interested
    @GetMapping("/{id}/interested")
    public ResponseEntity<List<Show>> getInterestedShows(@PathVariable Long id) {
        List<Show> interestedShows = interestedService.getInterestedShows(id);
        return new ResponseEntity<>(interestedShows, HttpStatus.OK);
    }

    // PUT /customers/{id} — Update customer profile
    @PutMapping("/{id}")
        public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        Optional<Customer> updatedCustomer = customerService.getCustomerById(id);
        if(updatedCustomer.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        try{
            Customer savedCustomer = customerService.updateCustomer(id, customer);
            return new ResponseEntity<>(savedCustomer, HttpStatus.OK);
        } catch (RuntimeException e){
            System.out.println("Error updating customer: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        }

        // PUT /customers/{id}/genres — Update customer preferred genres
        @PutMapping("/{id}/genres")
        public ResponseEntity<Customer> updateCustomerPreferredGenres(@PathVariable Long id, @RequestBody List<Long> genreIds) {
            try {
                Customer updatedCustomer = customerService.setCustomerPreferredGenres(id, new HashSet<>(genreIds));
                return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
            } catch (RuntimeException e) {
                System.out.println("Error setting preferred genres: " + e.getMessage());
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        // DELETE /customers/{id} — Delete customer profile
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
            customerService.deleteCustomer(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        // DELETE /customers/{id}/follow/{bandId} — Unfollow a band
        @DeleteMapping("/{id}/follow/{bandId}")
        public ResponseEntity<Void> unfollowBand(@PathVariable Long id, @PathVariable Long bandId) {
            try {
                followService.unfollowBand(id, bandId);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (RuntimeException e) {
                System.out.println("Error unfollowing band: " + e.getMessage());
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        // DELETE /customers/{id}/interested/{showId} — Unmark show as interested
         @DeleteMapping("/{id}/interested/{showId}")
    public ResponseEntity<Void> unmarkInterested(@PathVariable Long id, @PathVariable Long showId) {
        try {
            interestedService.unmarkInterested(id, showId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            System.out.println("Error unmarking interested: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

        

    

   

}