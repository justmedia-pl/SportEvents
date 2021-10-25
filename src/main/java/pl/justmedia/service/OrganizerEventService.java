package pl.justmedia.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.justmedia.entity.*;
import pl.justmedia.entity.enums.UserType;
import pl.justmedia.entity.repositories.EventsRepository;
import pl.justmedia.entity.repositories.UserRepository;
import pl.justmedia.service.dto.*;
import pl.justmedia.service.exception.EventException;
import pl.justmedia.service.exception.SubscriptionException;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class OrganizerEventService {
    @NonNull
    private UserRepository userRepository;
    @NonNull
    private EventsRepository eventsRepository;

    public RegisteredEvent addEvent(@NonNull RegisterEventForm form){
        if(userRepository.getById(form.getUserId()) == null){
            throw new SubscriptionException("");
        }

        if (!(userRepository.getById(form.getUserId()).getUserType().equals(UserType.ORGANIZER))) {
            throw new SubscriptionException("Given user is not a Organizer");
        }

        Organizer organizer = userRepository.getOrganizerByUserId(form.getUserId());
        Event event = new Event(
                form.getEventTitle(),
                LocalDateTime.parse(form.getEventDate()),
                Integer.valueOf(form.getEventPlayerLimit()),
                Double.valueOf(form.getEventFee()));
        organizer.addEvent(event);
        userRepository.save(organizer);
        return new RegisteredEvent(organizer.getUserId(),event.getEventId());
    }
    public void removeEvent(@NonNull RemoveEventForm form){
        Organizer organizer = userRepository.getOrganizerByUserId(form.getUserId());
        organizer.removeEvent(form.getEvent());
        userRepository.save(organizer);
    }
    /* Prepare form for POST purposes (GET ID FORM URL PARAM) and POST IT
    * Added LocalDateTime auto generation if null
    *
    * */
    public RegisteredEvent addEventRest(@NonNull RegisterEventForm form, UUID userId){
        //Some validation rules
        //TODO Extend Date Validation Class
        String formDate = form.getEventDate();
        String formPlayerLimit = form.getEventPlayerLimit();
        String formEventFee = form.getEventFee();

        if (form.getEventTitle().equals("")) {
            throw new EventException("Event must have a TITLE!");
        }
        if (eventsRepository.findByEventTitle(form.getEventTitle()).size() > 0) {
            throw new EventException("Event with given TITLE exists !");
        }

        if (formDate.equals("") || formDate == null) {
            formDate = LocalDateTime.now().toString();
        }
        if (Integer.parseInt(formPlayerLimit) > 0){
            formPlayerLimit = String.valueOf(0);
        }
        if (Double.parseDouble(formEventFee) > 0){
            formEventFee = String.valueOf(0.0d);
        }
        //
        RegisterEventForm userAddedForm = new RegisterEventForm(
                userId,
                form.getEventTitle(),
                formDate,
                formPlayerLimit,
                formEventFee
        );
        return addEvent(userAddedForm);
    }
    public void removeEventRest(@NonNull RemoveEventForm form, UUID userId){
        RemoveEventForm subform = new RemoveEventForm(
                userId,
                form.getEvent()
        );
        removeEvent(subform);
    }

}
