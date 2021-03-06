package pl.justmedia;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.annotation.Transactional;
import pl.justmedia.entity.User;
import pl.justmedia.entity.repositories.EventsRepository;
import pl.justmedia.entity.repositories.UserRepository;
import pl.justmedia.service.OrganizerEventService;
import pl.justmedia.service.PlayerSubscriptionService;
import pl.justmedia.service.UserService;
import pl.justmedia.service.dto.RegisterEventForm;
import pl.justmedia.service.dto.RegisterOrganizerForm;
import pl.justmedia.service.dto.RegisterPlayerForm;
import pl.justmedia.service.dto.RegisterSubscriptionForm;

import java.time.LocalDateTime;
import java.util.Arrays;

@SpringBootApplication
public class SportEventsApplication extends SpringBootServletInitializer {

    @Autowired
    private UserService service;
    @Autowired
    EventsRepository eventsRepository;
    @Autowired
    OrganizerEventService organizerEventService;
    @Autowired
    PlayerSubscriptionService playerSubscriptionService;

    @Autowired
    UserRepository userRepository;

        public static void main(String[] args) {
            SpringApplication.run(SportEventsApplication.class, args);
        }

        @Bean
        InitializingBean adminData() {
            return () -> {
                final var admin = new RegisterOrganizerForm("admin",
                        "admin",
                        "admin@admin.com",
                        "",
                        "",
                        "",
                        "",
                        "SportEvent"
                );
                final var registeredOrganizerId = service.registerOrganizer(admin);
                service.updateUserRoles(registeredOrganizerId.getUserId(),"ROLE_ADMIN");

            };
        }

        @Bean
        @Profile("dev")
        InitializingBean sampleData() {
            return () -> {
                // INITIALIZE

                final var user1 = new RegisterPlayerForm("123",
                        "player",
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

                final var user2 = new RegisterOrganizerForm("123",
                        "Organizer",
                        "orgnaizer@player.com",
                        "PlayerCity",
                        "PlayerStreet",
                        "Poland",
                        "00000",
                        "PlayerName"
                );
                final var registeredOrganizerId = service.registerOrganizer(user2);
                final var registeredEventId = organizerEventService.addEvent(new RegisterEventForm(
                        registeredOrganizerId.getUserId(),
                        "Title",
                        LocalDateTime.now().toString(),
                        "10",
                        "0"
                ));
                final var registeredSubscriptionId = playerSubscriptionService.addSubscription(
                        new RegisterSubscriptionForm(
                                registeredUserId.getUserId(),
                                true,
                                LocalDateTime.now().toString(),
                                true,
                               registeredEventId.getEventId()
                        ));
                User user = userRepository.getOrganizerByUserId(registeredOrganizerId.getUserId());
                user.setUserRoles(Arrays.asList("ROLE_ADMIN","ROLE_USER"));
                userRepository.save(user);
              /*playerSubscriptionService.removeSubscription(new RemoveSubscriptionForm(
                      registeredUserId.getUserId(),
                      eventsRepository.getById(registeredEventId.getEventId())
                ));*/
            };
        }
}
