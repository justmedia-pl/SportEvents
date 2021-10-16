package pl.justmedia;

import pl.justmedia.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@SpringBootApplication
public class SportEventsApplication {

        public static void main(String[] args) {
            SpringApplication.run(SportEventsApplication.class, args);
        }

        @Component
        @RequiredArgsConstructor
        @Profile("dev")
        static class InitOnStartup {

           private final UserRepository personRepository;
           private final EventsRepository eventsRepository;

            @EventListener
            @Transactional
            public void setup(ApplicationReadyEvent event) {


            }
        }
}
