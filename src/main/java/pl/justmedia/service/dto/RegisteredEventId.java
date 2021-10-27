package pl.justmedia.service.dto;

import lombok.NonNull;
import lombok.Value;
import pl.justmedia.entity.Event;

import java.util.UUID;

@Value
public class RegisteredEventId {

    @NonNull
    UUID userId;
    @NonNull
    UUID eventId;
}
