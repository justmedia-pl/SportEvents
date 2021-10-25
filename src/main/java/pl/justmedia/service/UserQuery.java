package pl.justmedia.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.justmedia.entity.*;
import pl.justmedia.entity.enums.UserType;
import pl.justmedia.entity.repositories.UserRepository;
import pl.justmedia.service.dto.OrganizerDetails;
import pl.justmedia.service.dto.OrganizerView;
import pl.justmedia.service.dto.PlayerDetails;
import pl.justmedia.service.dto.PlayerView;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class UserQuery {

    @NonNull
    private final UserRepository userRepository;


    public List<PlayerView> listPlayers(){

        List<PlayerView> collect = userRepository.getAllPlayers().stream()
                .map(Player::toPlayerView)
                .collect(Collectors.toList());
        return collect;
    }
    public PlayerDetails getPlayerDetails(UUID userId){
        return userRepository.findPlayerByUserId(userId).viewDetail();
    }

    public List<OrganizerView> listOrganizers(){
        List<OrganizerView> collect = userRepository.getAllOrganizers().stream()
                .filter(organizer -> organizer.getUserType().equals(UserType.ORGANIZER))
                .map(Organizer::toOrganizerView)
                .collect(Collectors.toList());
        return collect;
    }
    public OrganizerDetails getOrganizerDetails(UUID userId){
        return userRepository.getOrganizerByUserId(userId).viewDetail();
    }
}

