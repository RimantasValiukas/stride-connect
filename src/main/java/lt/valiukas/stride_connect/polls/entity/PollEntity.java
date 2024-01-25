package lt.valiukas.stride_connect.polls.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.valiukas.stride_connect.polls.dto.Poll;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "polls")
public class PollEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false)
    private UUID pollId;
    @Column(nullable = false)
    private String name;
    @Column(length = 2000)
    private String description;
    @Column(nullable = false)
    private Timestamp date;
    @ElementCollection
    @CollectionTable(name = "votedUsers", joinColumns = @JoinColumn(name = "pollId"))
    @Column(name = "votedUser")
    private List<UUID> votedUsers;
    @ElementCollection
    @CollectionTable(name = "variants", joinColumns = @JoinColumn(name = "pollId"))
    @MapKeyColumn(name = "variant")
    @Column(name = "count")
    private Map<String, Integer> variants;

    public static PollEntity convert(Poll poll) {
        return new PollEntity(
                poll.getPollId(),
                poll.getName(),
                poll.getDescription(),
                poll.getDate(),
                poll.getVotedUsers(),
                poll.getVariants()
        );
    }

}
