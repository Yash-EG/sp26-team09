    package com.team09.demo.service;

    import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import com.team09.demo.entity.Band;
    import com.team09.demo.entity.Follow;
    import com.team09.demo.repository.BandRepository;
    import com.team09.demo.repository.CustomerRepository;
    import com.team09.demo.repository.FollowRepository;

    @Service
    /**
     * Service class managing relationships between customers and bands for following features
     */
    public class FollowService {
        @Autowired
        private FollowRepository followRepository;

        @Autowired
        private CustomerRepository customerRepository;

        @Autowired
        private BandRepository bandRepository;

        /**
         * Method to follow a band for the customer
         * @param customerId  ID of the customer who wants to follow the band
         * @param bandId  ID of the band to be followed
         */
        public void followBand(Long customerId, Long bandId) {
            if (followRepository.findByCustomer_UserIdAndBand_UserId(customerId, bandId).isPresent()) {
                throw new RuntimeException("Already following this band");
            }
            Follow follow = new Follow();
            follow.setCustomer(customerRepository.getReferenceById(customerId));
            follow.setBand(bandRepository.getReferenceById(bandId));
            followRepository.save(follow);
            follow.setFollowedAt(java.time.LocalDateTime.now());
        }

        /**
         * Method to unfollow a band for the customer
         * @param customerId ID of the customer to unfollow band
         * @param bandId ID of the band to be unfollowed
         */
        public void unfollowBand(Long customerId, Long bandId) {
            Follow follow = followRepository.findByCustomer_UserIdAndBand_UserId(customerId, bandId)
                    .orElseThrow(() -> new RuntimeException("Not following this band"));
            followRepository.delete(follow);
        }


        /**
         * Retreive all of the followed bands for a given customer
         * @param customerId ID of the customer to retrieve followed bands for
         * @return List of followed bands for the customer
         */
        public List<Band> getFollowedBands(Long customerId) {
            return followRepository.findByCustomer_UserId(customerId).stream()
                    .map(Follow::getBand)
                    .collect(java.util.stream.Collectors.toList());
        }
        
    }
