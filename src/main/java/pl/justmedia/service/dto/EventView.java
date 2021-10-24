package pl.justmedia.service.dto;

import lombok.Value;
import pl.justmedia.entity.UserType;

import java.time.LocalDateTime;
import java.util.UUID;

@Value
public class EventView {
    UUID eventId;
    String Title;
    LocalDateTime eventDate;
    int eventPlayerLimit;
    double eventFee;
    int subscriptionsCount;
}
