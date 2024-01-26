package lt.valiukas.stride_connect.polls.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PollUI {

    private UUID creatorId;
    private String name;
    private String description;
    private Timestamp date;
    private Timestamp expirationDate;
    private boolean active;
    private List<UUID> votedUsers;
    private List<String> variants;

}
