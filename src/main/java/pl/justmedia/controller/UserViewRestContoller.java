package pl.justmedia.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.justmedia.entity.User;
import pl.justmedia.service.UserQuery;
import pl.justmedia.service.dto.PlayerDetails;
import pl.justmedia.service.dto.PlayerView;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/players/view")
@RequiredArgsConstructor
public class UserViewRestContoller {
    @NonNull
    private final UserQuery query;

    @GetMapping
        // default mapping
    List<PlayerView> getPlayers() {
        return query.listPlayers();
    }
    @GetMapping("/{userId}")
    PlayerDetails getPlayer(@PathVariable UUID userId){
        return query.getPlayerDetails(userId);
    }
}
