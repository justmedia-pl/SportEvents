package pl.justmedia.entity;

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
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "event_id")
    private User eventOrganizer;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "event_id")
    private List<Subscription> eventSubscriptions;

    public Event(String eventTtile,
                 LocalDateTime eventDate,
                 Integer eventPlayerLimit,
                 double eventFee,
                 Organizer eventOrganizer) {
        this.eventId = UUID.randomUUID();
        this.eventTtile = eventTtile;
        this.eventDate = eventDate;
        this.eventPlayerLimit = eventPlayerLimit;
        this.eventFee = eventFee;
        this.eventOrganizer = eventOrganizer;
    }
}
