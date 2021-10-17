package pl.justmedia.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface EventsRepository extends JpaRepository <Event, UUID> {

    List<Event> findByEventTtile (String eventTtile);
    List<Event> findByEventDate (LocalDateTime eventDate);
}
