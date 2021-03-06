package pl.justmedia.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.justmedia.entity.Organizer;
import pl.justmedia.entity.Player;
import pl.justmedia.entity.User;
import pl.justmedia.entity.repositories.UserRepository;
import pl.justmedia.service.dto.RegisterOrganizerForm;
import pl.justmedia.service.dto.RegisterPlayerForm;
import pl.justmedia.service.dto.RegisteredUserId;
import pl.justmedia.service.exception.EmailAlreadyExistException;
import pl.justmedia.service.exception.UserNotExistException;

import java.util.List;
import java.util.UUID;


@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    @NonNull
    private final UserRepository userRepository;

    public RegisteredUserId updateUserRoles(UUID userId, String userRoles) throws UserNotExistException {
        User user = userRepository.getById(userId);
        if (user != null) {
            List<String> roles = List.of(userRoles.split(","));
            user.setUserRoles(roles);
            //userRepository.save(user);
            return new RegisteredUserId(user.getUserId());
        } else {
            throw new UserNotExistException("User not exists !");
        }
    }
    public RegisteredUserId registerPlayer(@NonNull RegisterPlayerForm form) throws EmailAlreadyExistException {
        if (userRepository.emailExists(form.getUserEmail(),null) || userRepository.loginExists(form.getUserLogin(),null)) {
            throw new EmailAlreadyExistException("Account with email or name exists");
        }
        Player player = Player.createWith(form);
        userRepository.save(player);
        return new RegisteredUserId(player.getUserId());
    }

    public RegisteredUserId updatePlayer(@NonNull RegisterPlayerForm form, UUID userId) {
        if (userRepository.emailExists(form.getUserEmail(),userId) || userRepository.loginExists(form.getUserLogin(),userId)) {
            throw new EmailAlreadyExistException("Account with email or name exists");
        }
        Player player = userRepository.getPlayerByUserId(userId);
        Player.updatePlayer(form, player);
        userRepository.save(player);
        return new RegisteredUserId(player.getUserId());
    }

    public RegisteredUserId registerOrganizer(@NonNull RegisterOrganizerForm form) throws EmailAlreadyExistException {
        if (userRepository.emailExists(form.getUserEmail(),null) || userRepository.loginExists(form.getUserLogin(),null)) {
            throw new EmailAlreadyExistException("Account with email or name exists");
        }
        Organizer organizer = Organizer.createWith(form);
        userRepository.save(organizer);
        return new RegisteredUserId(organizer.getUserId());
    }

    public RegisteredUserId updateOrganizer(@NonNull RegisterOrganizerForm form, UUID userId) {
        if (userRepository.emailExists(form.getUserEmail(),userId) || userRepository.loginExists(form.getUserLogin(),userId)) {
            throw new EmailAlreadyExistException("Account with email or name exists");
        }
        Organizer organizer = userRepository.getOrganizerByUserId(userId);
        Organizer.updateOrganizer(form, organizer);
        userRepository.save(organizer);
        return new RegisteredUserId(organizer.getUserId());
    }

}
