package lt.valiukas.stride_connect.polls;

import lt.valiukas.stride_connect.polls.dto.Poll;
import lt.valiukas.stride_connect.polls.dto.PollUI;
import lt.valiukas.stride_connect.polls.dto.Vote;
import lt.valiukas.stride_connect.polls.service.PollService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/polls")
public class PollController {

    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Poll> getPolls() {
        return pollService.getPolls();
    }

    @GetMapping(value = "/{pollId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Poll getPollById(@PathVariable UUID pollId) {
        return pollService.getPollById(pollId);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createPoll(@RequestBody PollUI pollUI) {
        Poll poll = pollService.convertToPoll(pollUI);

        pollService.createPoll(poll);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping(value = "/update/{pollId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void addVote(@RequestBody Vote option, @PathVariable UUID pollId) {
        String vote = option.getOption();
        pollService.addVote(vote, pollId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{pollId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePollById(@PathVariable UUID pollId) {
        pollService.deletePollById(pollId);
    }

}
