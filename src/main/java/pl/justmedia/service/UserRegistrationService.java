package pl.justmedia.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.justmedia.entity.Player;
import pl.justmedia.entity.UserRepository;
import pl.justmedia.service.dto.RegisterPlayerForm;
import pl.justmedia.service.dto.RegisteredUserId;

import javax.transaction.Transactional;
import java.time.format.DateTimeFormatter;

@Service
@Transactional
@RequiredArgsConstructor
public class UserRegistrationService {
    @NonNull
    private final UserRepository userRepository;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public RegisteredUserId registerPlayer(@NonNull RegisterPlayerForm form){

        Player player = Player.createWith(form);
        return new RegisteredUserId(player.getUserId());
    }
}
