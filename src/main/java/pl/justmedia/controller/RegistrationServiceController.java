package pl.justmedia.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.justmedia.service.UserMaintenanceService;
import pl.justmedia.service.UserRegisterService;
import pl.justmedia.service.dto.RegisterOrganizerForm;
import pl.justmedia.service.dto.RegisterPlayerForm;
import pl.justmedia.service.dto.RegisteredUserId;

import java.util.UUID;
@CrossOrigin
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RegistrationServiceController {
    @NonNull
    private final UserRegisterService userRegisterService;
    @NonNull
    private final UserMaintenanceService userMaintenanceService;

    @PostMapping("/register/player")
    ResponseEntity<RegisteredUserId> registerUser(@RequestBody RegisterPlayerForm form) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userRegisterService.registerPlayerWithEmailConfirmation(form));
    }

    @PostMapping("/register/organizer")
    ResponseEntity<RegisteredUserId> registerUser(@RequestBody RegisterOrganizerForm form) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userRegisterService.registerOrganizerWithEmailConfirmation(form));
    }

    @GetMapping("/register/{tokenId}")
    ResponseEntity<RegisteredUserId> verifyUser(@PathVariable String tokenId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userRegisterService.verifyUser(tokenId));
    }

}
