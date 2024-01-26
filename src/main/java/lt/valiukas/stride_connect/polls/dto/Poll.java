package lt.valiukas.stride_connect.polls.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.valiukas.stride_connect.polls.entity.PollEntity;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Poll {
    private UUID pollId;
    private UUID creatorId;
    private String name;
    private String description;
    private Timestamp date;
    private Timestamp expirationDate;
    private boolean active;
    private List<UUID> votedUsers;
    private Map<String, Integer> variants;

    public static Poll convert(PollEntity entity) {
        return  new Poll(
                entity.getPollId(),
                entity.getCreatorId(),
                entity.getName(),
                entity.getDescription(),
                entity.getDate(),
                entity.getExpirationDate(),
                entity.isActive(),
                entity.getVotedUsers(),
                entity.getVariants()
        );
    }


}
