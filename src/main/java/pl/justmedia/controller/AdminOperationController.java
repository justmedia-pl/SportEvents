package pl.justmedia.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.justmedia.service.*;
import pl.justmedia.service.dto.*;

import java.util.List;
import java.util.UUID;
@CrossOrigin
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AdminOperationController {
    @NonNull
    private final UserQuery userQuery;
    @NonNull
    private final UserService userService;
    @NonNull
    private final PlayerSubscriptionService playerSubscriptionService;
    @NonNull
    private final OrganizerEventService organizerEventService;
    @NonNull
    private final UserMaintenanceService userMaintenanceService;
    @NonNull
    private final EventQuery eventQuery;
    @CrossOrigin
    @GetMapping("/users")
    List<UserView> getAllUsers() {
        return userQuery.listAllUsers();
    }
    @CrossOrigin
    @GetMapping("/events")
    List<EventView> getEvents() {
        return eventQuery.listEvents();
    }

    @CrossOrigin
    @GetMapping(value="/users/edit/player/{userId}",produces = MediaType.APPLICATION_JSON_VALUE)
    RegisterPlayerForm getPlayerForEdit(@PathVariable UUID userId){
        return userQuery.getPlayerForEdit(userId);
    }
    @CrossOrigin
    @PostMapping("/users/edit/player/{userId}")
        //@PreAuthorize("hasRole('ADMIN')")
        ResponseEntity<RegisteredUserId> updatePlayer(@RequestBody RegisterPlayerForm form, @PathVariable UUID userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.updatePlayer(form,userId));
    }
    @CrossOrigin
    @PostMapping("/users/edit/organizer/{userId}")
        //@PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<RegisteredUserId> updateOrgnaizer(@RequestBody RegisterOrganizerForm form, @PathVariable UUID userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userService.updateOrganizer(form,userId));
    }
    @CrossOrigin
    @GetMapping(value="/users/edit/organizer/{userId}",produces = MediaType.APPLICATION_JSON_VALUE)
    RegisterOrganizerForm getOrganizerForEdit(@PathVariable UUID userId){
        return userQuery.getOrganizerForEdit(userId);
    }
    //add to user functions

    @CrossOrigin
    @PostMapping("/users/deactivate/{userId}")
    ResponseEntity<MaintenanceUserId> deactivateUser(@PathVariable UUID userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userMaintenanceService.deactivateUser(userId));
    }
    @CrossOrigin
    @PostMapping("/users/activate/{userId}")
    ResponseEntity<MaintenanceUserId> activateUser(@PathVariable UUID userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userMaintenanceService.activateUser(userId));
    }
    @CrossOrigin
    @DeleteMapping("/users/{userId}")
    ResponseEntity<MaintenanceUserId> deleteUser(@PathVariable UUID userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userMaintenanceService.deleteUser(userId));
    }
}
