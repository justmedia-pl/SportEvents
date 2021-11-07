package pl.justmedia.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.justmedia.service.PlayerSubscriptionService;
import pl.justmedia.service.UserService;
import pl.justmedia.service.dto.DeletedSubscriptionId;
import pl.justmedia.service.dto.RegisterSubscriptionForm;
import pl.justmedia.service.dto.RegisteredSubscriptionId;
import pl.justmedia.service.dto.RemoveSubscriptionForm;

import java.util.UUID;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerSubscriptionWriteController {
    @NonNull  private final UserService userService;
    @NonNull  private final  PlayerSubscriptionService playerSubscriptionService;

    @PostMapping("/{userId}/subscriptions")
    ResponseEntity<RegisteredSubscriptionId> registerSubscription(@RequestBody RegisterSubscriptionForm form, @PathVariable UUID userId){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(playerSubscriptionService.addSubscriptionRest(form,userId));
    }
    @DeleteMapping("/{userId}/subscriptions")
    ResponseEntity<DeletedSubscriptionId> removeSubscription(@RequestBody RemoveSubscriptionForm form, @PathVariable UUID userId){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(playerSubscriptionService.removeSubscriptionRest(form,userId));
    }
    //TODO PUT **
}
