package lt.valiukas.stride_connect.polls.dto;

import lombok.*;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Vote {
    private String option;
    private UUID userId;
}
