package com.team09.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.team09.demo.entity.Interested;
import com.team09.demo.entity.Show;
import com.team09.demo.repository.CustomerRepository;
import com.team09.demo.repository.InterestedRepository;
import com.team09.demo.repository.ShowRepository;

@Service
public class InterestedService {

    @Autowired
    private InterestedRepository interestedRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ShowRepository showRepository;

    public void markInterested(Long customerId, Long showId) {
        if (interestedRepository.findByCustomer_UserIdAndShow_ShowId(customerId, showId).isPresent()) {
            throw new RuntimeException("Already marked as interested in this show");
        }
        Interested interested = new Interested();
        interested.setCustomer(customerRepository.getReferenceById(customerId));
        interested.setShow(showRepository.getReferenceById(showId));
        interested.setInterestedAt(java.time.LocalDateTime.now());
        interestedRepository.save(interested);
    }

    public void unmarkInterested(Long customerId, Long showId) {
        Interested interested = interestedRepository.findByCustomer_UserIdAndShow_ShowId(customerId, showId)
                .orElseThrow(() -> new RuntimeException("Not marked as interested in this show"));
        interestedRepository.delete(interested);
    }

    public List<Show> getInterestedShows(Long customerId) {
        return interestedRepository.findByCustomer_UserId(customerId).stream()
                .map(Interested::getShow)
                .collect(java.util.stream.Collectors.toList());
    }


}
