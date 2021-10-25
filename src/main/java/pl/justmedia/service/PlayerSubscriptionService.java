package pl.justmedia.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.justmedia.entity.*;
import pl.justmedia.entity.enums.UserType;
import pl.justmedia.entity.repositories.EventsRepository;
import pl.justmedia.entity.repositories.SubscriptionRepository;
import pl.justmedia.entity.repositories.UserRepository;
import pl.justmedia.service.dto.RegisterSubscriptionForm;
import pl.justmedia.service.dto.RegisteredSubscription;
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

    public RegisteredSubscription addSubscription(@NonNull RegisterSubscriptionForm form){
        if(userRepository.getById(form.getUserId()) == null){
            throw new SubscriptionException("");
        }
        if (!(userRepository.getById(form.getUserId()).getUserType().equals(UserType.PLAYER))) {
            throw new SubscriptionException("Given user is not a Player");
            }

        Player player = userRepository.getPlayerByUserId(form.getUserId());
        Subscription subscription = new Subscription(
                form.isSubscriptionPaymentDone(),
                LocalDateTime.now(),
                form.isSubscriptionApproved(),
                form.getEvent(),player);
        player.addSubscription(subscription);
        userRepository.save(player);
        return new RegisteredSubscription(player.getUserId(),subscription.getSubscriptionId());
    }

    public void removeSubscription(@NonNull RemoveSubscriptionForm form){
        Player player = userRepository.getPlayerByUserId(form.getUserId());
        if (!player.getUserType().equals(UserType.PLAYER)) {
            throw new SubscriptionException("Given User is not a Player");
        }
        Event event = eventsRepository.getById(form.getEvent().getEventId());
        Subscription subscription = subscriptionRepository.findFirstByEvent_EventIdAndPlayer_UserId(event.getEventId(),player.getUserId());

        player.removeSubscription(event);
        event.removeSubscription(subscription);
        userRepository.save(player);
    }

    /* Prepare form for POST purposes (GET ID FORM URL PARAM) and POST IT
     * */
    public RegisteredSubscription addSubscriptionRest(@NonNull RegisterSubscriptionForm form, UUID userId){
        //validation
        RegisterSubscriptionForm subForm = new RegisterSubscriptionForm(
                userId,
                form.isSubscriptionPaymentDone(),
                form.getSubscriptionDate(),
                form.isSubscriptionApproved(),
                form.getEvent()
        );

        return addSubscription(subForm);
    }
    /* Prepare form for POST purposes (GET ID FORM URL PARAM) and POST IT
     * */
    public void removeSubscriptionRest(@NonNull RegisterSubscriptionForm form, UUID userId){
        //validation
       RemoveSubscriptionForm subForm = new RemoveSubscriptionForm(
                userId,
                form.getEvent()
        );
       removeSubscription(subForm);
    }

}
