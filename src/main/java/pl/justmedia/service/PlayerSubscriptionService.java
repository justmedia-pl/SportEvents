package pl.justmedia.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.justmedia.entity.*;
import pl.justmedia.entity.enums.UserType;
import pl.justmedia.entity.repositories.EventsRepository;
import pl.justmedia.entity.repositories.SubscriptionRepository;
import pl.justmedia.entity.repositories.UserRepository;
import pl.justmedia.service.dto.DeletedSubscriptionId;
import pl.justmedia.service.dto.RegisterSubscriptionForm;
import pl.justmedia.service.dto.RegisteredSubscriptionId;
import pl.justmedia.service.dto.RemoveSubscriptionForm;
import pl.justmedia.service.exception.SubscriptionException;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class PlayerSubscriptionService {
    @NonNull
    private UserRepository userRepository;
    @NonNull
    EventsRepository eventsRepository;
    @NonNull
    SubscriptionRepository subscriptionRepository;
    //TODO ADD ADMIN CHANGE SUBSCRP DATE
    public RegisteredSubscriptionId addSubscription(@NonNull RegisterSubscriptionForm form){

        if (!(userRepository.getUserType(form.getUserId()).equals(UserType.PLAYER))) {
            throw new SubscriptionException("Given user is not a Player");
            }

        Player player = userRepository.getPlayerByUserId(form.getUserId());
        Event event = eventsRepository.getById(form.getEventId());
        Subscription subscription = new Subscription(
                form.isSubscriptionPaymentDone(),
                LocalDateTime.now(),
                form.isSubscriptionApproved(),
                event,player);
        player.addSubscription(subscription);
        event.addSubscription(subscription);
        eventsRepository.save(event);
        userRepository.save(player);
        return new RegisteredSubscriptionId(player.getUserId(),subscription.getSubscriptionId());
    }

    public UUID removeSubscription(@NonNull RemoveSubscriptionForm form){
        if (!(userRepository.getUserType(form.getUserId()).equals(UserType.PLAYER))) {
            throw new SubscriptionException("Given User is not a Player");
        }
        Player player = userRepository.getPlayerByUserId(form.getUserId());


        Event event = eventsRepository.getById(form.getEventId());
        Subscription subscription = subscriptionRepository.findFirstByEvent_EventIdAndPlayer_UserId(event.getEventId(),player.getUserId());
        UUID removedSubscription = subscription.getSubscriptionId();
        if (subscription != null) {
            player.removeSubscription(event);
            event.removeSubscription(subscription);
            userRepository.save(player);
            return removedSubscription;
        }
        return null;
    }

    /* Prepare form for POST purposes (GET ID FORM URL PARAM) and POST IT
     * */
    public RegisteredSubscriptionId addSubscriptionRest(@NonNull RegisterSubscriptionForm form, UUID userId){
        //validation
        RegisterSubscriptionForm subForm = new RegisterSubscriptionForm(
                userId,
                form.isSubscriptionPaymentDone(),
                form.getSubscriptionDate(),
                form.isSubscriptionApproved(),
                form.getEventId()
        );

        return addSubscription(subForm);
    }
    /* Prepare form for POST purposes (GET ID FORM URL PARAM) and POST IT
     * */
    public DeletedSubscriptionId removeSubscriptionRest(RemoveSubscriptionForm form, UUID userId){
        //validation
       RemoveSubscriptionForm subForm = new RemoveSubscriptionForm(
                userId,
                form.getEventId()
        );
       UUID removedSubscription = removeSubscription(subForm);
       if (removedSubscription == null){
            throw new SubscriptionException("Subscription removing problem !");
        }
       return new DeletedSubscriptionId(userId,removedSubscription);
    }

}
