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
@NoArgsConstructor
@Entity(name = "polls")
public class PollEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false)
    private UUID pollId;
    @Column
    private UUID creatorId;
    @Column(nullable = false)
    private String name;
    @Column(length = 2000)
    private String description;
    @Column(nullable = false)
    private Timestamp date;
    @Column(nullable = false)
    Timestamp expirationDate;
    @Column
    private boolean active;
    @ElementCollection
    @CollectionTable(name = "votedUsers", joinColumns = @JoinColumn(name = "pollId"))
    @Column(name = "votedUser")
    private List<UUID> votedUsers;
    @ElementCollection
    @CollectionTable(name = "variants", joinColumns = @JoinColumn(name = "pollId"))
    @MapKeyColumn(name = "variant")
    @Column(name = "count")
    private Map<String, Integer> variants;

    public PollEntity(UUID pollId, UUID creatorId, String name, String description, Timestamp date, Timestamp expirationDate, boolean active, List<UUID> votedUsers, Map<String, Integer> variants) {
        this.pollId = pollId;
        this.creatorId = creatorId;
        this.name = name;
        this.description = description;
        this.date = date;
        this.expirationDate = expirationDate;
        this.active = active;
        this.votedUsers = votedUsers;
        this.variants = variants;
        checkIfTimePassed();
    }

    public static PollEntity convert(Poll poll) {
        return new PollEntity(
                poll.getPollId(),
                poll.getCreatorId(),
                poll.getName(),
                poll.getDescription(),
                poll.getDate(),
                poll.getExpirationDate(),
                poll.isActive(),
                poll.getVotedUsers(),
                poll.getVariants()
        );
    }

    private void checkIfTimePassed() {
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());

        if (currentTime.before(expirationDate)) {
            active = false;
        }
    }

}
