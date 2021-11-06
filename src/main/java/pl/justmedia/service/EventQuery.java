package pl.justmedia.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.justmedia.entity.*;
import pl.justmedia.entity.repositories.EventsRepository;
import pl.justmedia.service.dto.EventDetails;
import pl.justmedia.service.dto.EventView;
import pl.justmedia.service.exception.EventException;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class EventQuery {

    @NonNull
    private final EventsRepository eventsRepository;

    public List<EventView> listEvents(){
        List<EventView> collect = eventsRepository.findAll().stream()
                .map(Event::toView)
                .collect(Collectors.toList());
        return collect;
    }
    //TODO REWRITE METHODS TO OPTIONAL
    // TODO 404 NOT 500 https://mkyong.com/spring-boot/spring-rest-error-handling-example/
    public EventDetails getEventDetails(UUID eventId){
        Optional<Event> eventOptional = eventsRepository.findById(eventId);
       if (!eventOptional.isPresent()) {
            throw new EventException("Event Not FOUND !");
       }

        return eventsRepository.getById(eventId).viewDetail();
    }
}
