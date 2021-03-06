package pl.justmedia.service.dto;

import lombok.Getter;
import lombok.Value;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Value
public class EventDetails {
    UUID eventId;
    UUID organizerId;
    String Title;
    LocalDateTime eventDate;
    int eventPlayerLimit;
    double eventFee;
    List<SubscriptionEventView> playerSubscriptions;
}
