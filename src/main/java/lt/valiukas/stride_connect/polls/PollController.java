package lt.valiukas.stride_connect.polls;

import lt.valiukas.stride_connect.polls.dto.Poll;
import lt.valiukas.stride_connect.polls.dto.PollUI;
import lt.valiukas.stride_connect.polls.service.PollService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/polls")
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

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createPoll(@RequestBody PollUI pollUI) {
        Poll poll = pollService.convertToPoll(pollUI);

        pollService.createPoll(poll);
    }
}
