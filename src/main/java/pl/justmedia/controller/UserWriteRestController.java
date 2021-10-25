package pl.justmedia.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.justmedia.entity.User;
import pl.justmedia.service.OrganizerEventService;
import pl.justmedia.service.PlayerSubscriptionService;
import pl.justmedia.service.UserMainteneceService;
import pl.justmedia.service.UserService;
import pl.justmedia.service.dto.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserWriteRestController {
    @NonNull UserService userService;
    @NonNull OrganizerEventService organizerEventService;
    @NonNull PlayerSubscriptionService playerSubscriptionService;
    @NonNull UserMainteneceService userMainteneceService;

    @PostMapping("/players")
    ResponseEntity<RegisteredUserId> registerUser(@RequestBody RegisterPlayerForm form){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.registerPlayer(form));
    }
    @PutMapping("/players/{userId}")
    ResponseEntity<RegisteredUserId> updatePlayer(@RequestBody RegisterPlayerForm form, @PathVariable UUID userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.updatePlayer(form,userId));
    }
    @PostMapping("/players/{userId}/subscription")
    ResponseEntity<RegisteredSubscription> registerSubscription(RegisterSubscriptionForm form, @PathVariable UUID userId){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(playerSubscriptionService.addSubscriptionRest(form,userId));
    }

    @PostMapping("/organizers")
    ResponseEntity<RegisteredUserId> registerOrganizer(@RequestBody RegisterOrganizerForm form){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.registerOrganizer(form));
    }
    @PostMapping("/organizers/{userId}/event")
    ResponseEntity<RegisteredEvent> registerEvent(RegisterEventForm form, @PathVariable UUID userId){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(organizerEventService.addEventRest(form,userId));
    }


}
