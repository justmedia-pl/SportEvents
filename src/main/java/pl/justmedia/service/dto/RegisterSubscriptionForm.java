package pl.justmedia.service.dto;

import lombok.NonNull;
import lombok.Value;
import pl.justmedia.entity.Event;

import java.time.LocalDateTime;
import java.util.UUID;

@Value
public class RegisterSubscriptionForm {
  @NonNull
   UUID userId;
   boolean subscriptionPaymentDone;
   LocalDateTime subscriptionDate;
   boolean subscriptionApproved;
   @NonNull
   Event event;
}
