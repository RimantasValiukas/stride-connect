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
    private String name;
    private String description;
    private Timestamp date;
    private List<UUID> votedUsers;
    private Map<String, Integer> variants;

    public static Poll convert(PollEntity entity) {
        return  new Poll(
                entity.getPollId(),
                entity.getName(),
                entity.getDescription(),
                entity.getDate(),
                entity.getVotedUsers(),
                entity.getVariants()
        );
    }


}
