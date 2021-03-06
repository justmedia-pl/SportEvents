package pl.justmedia.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.justmedia.service.OrganizerEventService;
import pl.justmedia.service.UserService;
import pl.justmedia.service.dto.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/organizers")
@RequiredArgsConstructor
public class OrganizerEventWriteController {
    @NonNull  private final UserService userService;
    @NonNull  private final OrganizerEventService organizerEventService;

    @GetMapping("/{userId}/event")
    String infoText(){
        return "AddEvent";
    }

    @PostMapping("/{userId}/event")
    ResponseEntity<RegisteredEventId> registerEvent(@RequestBody RegisterEventForm form, @PathVariable UUID userId){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(organizerEventService.addEventRest(form,userId));
    }
    @DeleteMapping("/{userId}/event")
    ResponseEntity<DeletedEventId> removeSubscription(@RequestBody RemoveEventForm form, @PathVariable UUID userId){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(organizerEventService.removeEventRest(form,userId));
    }
    //TODO PUT **
}
