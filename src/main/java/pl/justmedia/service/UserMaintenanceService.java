package pl.justmedia.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.justmedia.entity.User;
import pl.justmedia.entity.repositories.UserRepository;
import pl.justmedia.service.dto.MaintenanceUserId;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UserMaintenanceService {
    @NonNull
    private final UserRepository userRepository;

    public MaintenanceUserId deactivateUser(UUID userId){
        User user = userRepository.getById(userId);
        user.setUserActive(false);
        userRepository.save(user);
        return new MaintenanceUserId(userId);
    }
    public MaintenanceUserId activateUser(UUID userId){
        User user = userRepository.getById(userId);
        user.setUserActive(true);
        userRepository.save(user);
        return new MaintenanceUserId(userId);
    }
    public MaintenanceUserId deleteUser(UUID userId){
        userRepository.deleteByUserId(userId);
        return new MaintenanceUserId(userId);
    }
}
