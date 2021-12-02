package pl.justmedia.entity.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.justmedia.entity.ConfirmationToken;

import java.util.UUID;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, String> {
    ConfirmationToken findByConfirmationToken(String confirmationToken);
}