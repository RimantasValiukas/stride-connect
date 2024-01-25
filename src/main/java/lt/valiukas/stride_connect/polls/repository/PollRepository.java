package lt.valiukas.stride_connect.polls.repository;

import lt.valiukas.stride_connect.polls.entity.PollEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PollRepository extends JpaRepository<PollEntity, UUID> {
}
