package pl.justmedia.entity;

import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "events")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EqualsAndHashCode
public class Event {
    @Id
    private UUID eventId;
    private String eventTtile;
    private LocalDateTime eventDate;
    private Integer eventPlayerLimit;
    private double eventFee;



    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "event_id")
    private List<Subscription> eventSubscriptions;

    public Event(@NotNull String eventTtile,
                 @NotNull LocalDateTime eventDate,
                 @NotNull Integer eventPlayerLimit,
                 @NotNull double eventFee) {
        this.eventId = UUID.randomUUID();
        this.eventTtile = eventTtile;
        this.eventDate = eventDate;
        this.eventPlayerLimit = eventPlayerLimit;
        this.eventFee = eventFee;
    }
}
