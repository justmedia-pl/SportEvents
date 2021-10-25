package pl.justmedia.service.dto;

import lombok.Value;
import pl.justmedia.entity.enums.UserType;

import java.util.UUID;
@Value
public class OrganizerView {
    UUID userId;
    String name;
    String email;
    UserType type;
    int eventsCount;
    boolean active;
}
