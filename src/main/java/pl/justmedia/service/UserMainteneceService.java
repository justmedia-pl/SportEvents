package pl.justmedia.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.justmedia.entity.User;
import pl.justmedia.entity.repositories.UserRepository;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UserMainteneceService {
    @NonNull
    private final UserRepository userRepository;

    public void deactivateUser(UUID userId){
        User user = userRepository.getById(userId);
        user.setUserActive(false);
        userRepository.save(user);
    }
    public void activateUser(UUID userId){
        User user = userRepository.getById(userId);
        user.setUserActive(true);
        userRepository.save(user);
    }
}