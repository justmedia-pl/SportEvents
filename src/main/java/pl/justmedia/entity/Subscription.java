package pl.justmedia.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
@Entity
@Table(name = "subscriptions")
@NoArgsConstructor(access = AccessLevel.PRIVATE) // for hibernate
@Getter
@EqualsAndHashCode
public class Subscription {
    @Id
    private UUID subscriptionId;
    private Boolean subscriptionPaymentDone;
    private LocalDateTime subscriptionDate;
    private Boolean subscriptionApporoved;

    public Subscription(Boolean subscriptionPaymentDone,
                        LocalDateTime subscriptionDate,
                        Boolean subscriptionApporoved) {
        this.subscriptionId =  UUID.randomUUID();
        this.subscriptionPaymentDone = subscriptionPaymentDone;
        this.subscriptionDate = subscriptionDate;
        this.subscriptionApporoved = subscriptionApporoved;
    }
}
