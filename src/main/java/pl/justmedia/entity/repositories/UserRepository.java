package pl.justmedia.entity.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.justmedia.entity.Organizer;
import pl.justmedia.entity.Player;
import pl.justmedia.entity.Subscription;
import pl.justmedia.entity.User;
import pl.justmedia.entity.enums.UserType;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    User findByUserEmail(String userEmail);
    User getByUserEmail(String userEmail);
    User getByUserLogin(String userLogin);
    Optional<User> findByUserLogin (String userLogin);
    Player getPlayerByUserId(UUID userId);
    Organizer getOrganizerByUserId(UUID userId);
    List<User> findByUserActive(boolean active);
    List<User> findAll();
    List<Player> findByPlayerTeamName(String playerTeamName);
    List<Organizer> findByOrganizerName(String organizerName);
    @Query("select u.userType from User u where u.userId =  (?1) ")
    UserType getUserType(UUID userId);
    @Query("from User u where u.userType = pl.justmedia.entity.enums.UserType.PLAYER")
    List<Player> getAllPlayers ();
    @Query("from User u where u.userType = pl.justmedia.entity.enums.UserType.ORGANIZER")
    List<Organizer> getAllOrganizers ();
    Player findPlayerByUserId(UUID userId);
    @Query("select (count(u) > 0) from User u where upper(u.userEmail) = upper(?1)")
    boolean emailExists(String email, UUID userId);
    @Query("select (count(u) > 0) from User u where upper(u.userLogin) = upper(?1)")
    boolean loginExists(String login, UUID userId);
    @Query("select p.playerSubscriptions from Player p where p.userEmail = ?1")
    List<Subscription> findSubscriptionsForUserEmail(String userEmail);
}
