package lt.valiukas.stride_connect.polls.service;

import lt.valiukas.stride_connect.polls.dto.Poll;
import lt.valiukas.stride_connect.polls.entity.PollEntity;
import lt.valiukas.stride_connect.polls.repository.PollRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

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
        return pollRepository.findAll().stream().map(Poll::convert).toList();
    }

    public Poll getPollById(UUID pollId) {
        return pollRepository.findById(pollId).map(Poll::convert).get();
    }

    public void deletePollById(UUID pollId) {
        pollRepository.deleteById(pollId);
    }

}
