package pl.justmedia.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.justmedia.entity.Player;
import pl.justmedia.entity.Subscription;
import pl.justmedia.entity.UserRepository;
import pl.justmedia.service.dto.AddSubscriptionForm;
import pl.justmedia.service.dto.RegisteredSubscription;
import pl.justmedia.service.exception.SubscriptionException;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class PlayerSubscriptionService {
    @NonNull
    private UserRepository userRepository;

    public RegisteredSubscription addSubscripton(@NonNull AddSubscriptionForm form){
        if(userRepository.getById(form.getUserId()) == null){
            throw new SubscriptionException("");
        }
        if (!(userRepository.getById(form.getUserId()) instanceof Player)) {
            throw new SubscriptionException("");
            }

        Player player = (Player) userRepository.getById(form.getUserId());
        Subscription subscription = new Subscription(
                form.isSubscriptionPaymentDone(),
                LocalDateTime.now(),
                form.isSubscriptionApproved(),
                form.getEvent());
        player.addSubscription(subscription);
        userRepository.save(player);
        return new RegisteredSubscription(player.getUserId(),subscription.getSubscriptionId());
    }
}
