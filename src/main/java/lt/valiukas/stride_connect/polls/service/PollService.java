package lt.valiukas.stride_connect.polls.service;

import lt.valiukas.stride_connect.polls.dto.Poll;
import lt.valiukas.stride_connect.polls.dto.PollUI;
import lt.valiukas.stride_connect.polls.entity.PollEntity;
import lt.valiukas.stride_connect.polls.repository.PollRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PollService {
    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public void createPoll(Poll poll) {
        PollEntity pollEntity = PollEntity.convert(poll);
        pollRepository.save(pollEntity);
    }

    public List<Poll> getPolls() {
        List<Poll> polls = pollRepository.findAll().stream().map(Poll::convert).toList();
        return polls;
    }

    public Poll getPollById(UUID pollId) {
        return pollRepository.findById(pollId).map(Poll::convert).get();
    }

    public void deletePollById(UUID pollId) {
        pollRepository.deleteById(pollId);
    }

    public Poll convertToPoll(PollUI pollUI) {
        Poll poll = new Poll();
        Map<String, Integer> variants = new HashMap<>();

        for (String variant: pollUI.getVariants()) {
            variants.put(variant, 0);
        }

        poll.setCreatorId(pollUI.getCreatorId());
        poll.setName(pollUI.getName());
        poll.setDescription(pollUI.getDescription());
        poll.setDate(pollUI.getDate());
        poll.setExpirationDate(pollUI.getExpirationDate());
        poll.setActive(pollUI.isActive());
        poll.setVotedUsers(new ArrayList<>());
        poll.setVariants(variants);

        return poll;
    }

}
