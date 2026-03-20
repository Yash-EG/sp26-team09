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
    public class FollowService {
        @Autowired
        private FollowRepository followRepository;

        @Autowired
        private CustomerRepository customerRepository;

        @Autowired
        private BandRepository bandRepository;

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

        public void unfollowBand(Long customerId, Long bandId) {
            Follow follow = followRepository.findByCustomer_UserIdAndBand_UserId(customerId, bandId)
                    .orElseThrow(() -> new RuntimeException("Not following this band"));
            followRepository.delete(follow);
        }

        public List<Band> getFollowedBands(Long customerId) {
            return followRepository.findByCustomer_UserId(customerId).stream()
                    .map(Follow::getBand)
                    .collect(java.util.stream.Collectors.toList());
        }
        
    }
