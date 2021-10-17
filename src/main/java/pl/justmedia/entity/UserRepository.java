package pl.justmedia.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    List<User> findByUserEmail(String userEmail);
    List<User> findByUserLogin(String userLogin);
    List<Player> findByPlayerTeamName(String playerTeamName);
    List<Organizer> findByOrganizerName(String organizerName);
    @Query("select (count(c) > 0) from Customer c where upper(c.email) = upper(?1)")
    boolean emailExists(String email);
}
