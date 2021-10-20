package pl.justmedia;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import pl.justmedia.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import pl.justmedia.service.UserRegistrationService;
import pl.justmedia.service.dto.RegisterPlayerForm;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class SportEventsApplication {

    @Autowired
    private UserRegistrationService service;

    @Autowired UserRepository userRepository;

        public static void main(String[] args) {
            SpringApplication.run(SportEventsApplication.class, args);
        }

        @Bean
        InitializingBean sendDatabase() {
            return () -> {
                // INITIALIZE

                final var user1 = new RegisterPlayerForm("123",
                        "player1",
                        "player@player.com",
                        "PlayerCity",
                        "PlayerStreet",
                        "Poland",
                        "00000",
                        "PlayerName",
                        "PlayerLastName",
                        "1990-01-01",
                        "",
                        "0",
                        "",
                        "",
                        "123123123");
                final var registeredUserId = service.registerPlayer(user1);

                final var user2 = new Player("123",
                        "player1",
                        "player@player.com",
                        "PlayerCity",
                        "PlayerStreet",
                        "Poland",
                        "00000",
                        "PlayerName",
                        "PlayerLastName",
                        LocalDate.of(1990,1,1),
                        "",
                        0,
                        "",
                        "",
                        "123123123");
                //Subscription subscription1 = new Subscription(true, LocalDateTime.of(2021,1,10,10,0),true);
               // Subscription subscription2 = new Subscription(true, LocalDateTime.of(2021,1,10,10,0),false);
               // user1.addSubscription(subscription1);
               // user1.addSubscription(subscription2);
                userRepository.saveAllAndFlush(List.of(user2));

            };
        }
}
