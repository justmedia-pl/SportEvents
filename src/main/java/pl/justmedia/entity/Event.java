package pl.justmedia.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import pl.justmedia.service.PlayerSubscriptionService;
import pl.justmedia.service.dto.EventDetails;
import pl.justmedia.service.dto.EventView;
import pl.justmedia.service.dto.PlayerDetails;
import pl.justmedia.service.dto.PlayerView;
import pl.justmedia.service.exception.SubscriptionException;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
@Table(name = "events")

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@EqualsAndHashCode
public class Event {
    @Id
    private UUID eventId;
    private String eventTitle;
    private LocalDateTime eventDate;
    private int eventPlayerLimit;
    private double eventFee;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="event",orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Subscription> eventSubscriptions;
    @ManyToOne()
    @JoinColumn(name = "events_id",nullable=false)
    private Organizer organizer;

    public Event(@NotNull String eventTitle,
                 @NotNull LocalDateTime eventDate,
                 @NotNull Integer eventPlayerLimit,
                 @NotNull double eventFee,
                 @NotNull Organizer organizer) {
        this.eventId = UUID.randomUUID();
        this.eventTitle = eventTitle;
        this.eventDate = eventDate;
        this.eventPlayerLimit = eventPlayerLimit;
        this.eventFee = eventFee;
        this.organizer = organizer;
    }
    public void removeSubscription(Subscription subscription){

   if(subscription != null) {

       if( eventSubscriptions.contains(subscription)){
                eventSubscriptions.remove(subscription);
       } else {
            throw new SubscriptionException("Subscription for this event not exist for this Player");
         }
   }
    }
    public EventView toView(){
        return new EventView(eventId,
                eventTitle,
                eventDate,
                eventPlayerLimit,
                eventFee,
                eventSubscriptions.size());
    }
    public EventDetails viewDetail(){
        return new EventDetails(getEventId(),
                getOrganizer().getUserId(),
                getEventTitle(),
               getEventDate(),
                getEventPlayerLimit(),
                getEventFee(),
                getEventSubscriptions().stream().map(Subscription::toEventView).collect(Collectors.toList()));

    }
}
