package pl.justmedia.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.justmedia.service.*;
import pl.justmedia.service.dto.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
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
    private final UserMainteneceService userMainteneceService;
    @NonNull
    private final EventQuery eventQuery;

    @GetMapping("/users")
    List<UserView> getAllUsers() {
        return userQuery.listAllUsers();
    }
    @GetMapping("/events")
    List<EventView> getEvents() {
        return eventQuery.listEvents();
    }

    @PostMapping("/users/deactivate/{userId}")
    ResponseEntity<MaintenanceUserId> deactivateUser(@PathVariable UUID userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userMainteneceService.deactivateUser(userId));
    }

    @PostMapping("/users/activate/{userId}")
    ResponseEntity<MaintenanceUserId> activateUser(@PathVariable UUID userId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userMainteneceService.activateUser(userId));
    }
}
