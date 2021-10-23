package pl.justmedia.service.dto;

import lombok.Value;

import java.time.LocalDateTime;
import java.util.UUID;

@Value
public class SubscriptionView {
    UUID subscriptionId;
    boolean subscriptionPaymentDone;
    LocalDateTime subscriptionDate;
    boolean subscriptionApproved;

}
