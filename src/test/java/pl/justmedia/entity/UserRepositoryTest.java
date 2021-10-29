package pl.justmedia.entity;

import org.aspectj.weaver.ast.Or;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import pl.justmedia.entity.enums.UserType;
import pl.justmedia.entity.repositories.UserRepository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@ActiveProfiles("test")
@Transactional
class UserRepositoryTest {
    @Autowired
    private UserRepository repository;
    @Autowired
    private EntityManager em;

    @Test
    @BeforeEach
    void shouldSave() {
        // given
        final var user1 = new Player("123",
                "player1",
                "player@player.com",
                "PlayerCity",
                "PlayerStreet",
                "Poland",
                "00000",
                "PlayerName",
                "PlayerLastName",
                LocalDate.of(1990, 1, 1),
                "",
                0,
                "",
                "",
                "123123123");
        final var user2 = new Organizer("123",
                "Organizer1",
                "organizer@organizer.com",
                "OrganizerCity",
                "OrganizerStreet",
                "Poland",
                "00000",
                "OranizerName"
        );
        // when
        repository.saveAllAndFlush(List.of(user1, user2));
        // then
        assertEquals(repository.getById(user1.getUserId()), user1);
    }

    @Test
    void shouldFindUserByEmail() {
        // given
        /* shouldSave() */
        // when
        User user = repository.findByUserEmail("player@player.com");
        // then
        assertNotNull(user);
    }

    @Test
    void shouldGetUserById() {
        // given
        /* shouldSave() */
        // when
        User user = repository.findByUserEmail("player@player.com");
        if (user instanceof Player) {
            Player player = repository.getPlayerByUserId(user.getUserId());
            assertTrue(user.getUserId().equals(player.getUserId()));
        } else if (user instanceof Organizer) {
            Organizer organizer = repository.getOrganizerByUserId(user.getUserId());
            assertTrue(user.getUserId().equals(organizer.getUserId()));
        }
        // then

    }
    //TODO MOVE TEST TO INTEGRATION TESTS
   /* @Test
    void shouldAddPlayerSubscription() {
        User user = repository.findByUserEmail("player@player.com");
        User user2 = repository.findByUserEmail("organizer@organizer.com");
        Organizer organizer = repository.getOrganizerByUserId(user2.getUserId());
        Event event = new Event("Event",
                LocalDateTime.now(),
                10,
                0,
                (Organizer) user2);
        Subscription subscription1 = new Subscription(
                true,
                LocalDateTime.of(2021, 1, 10, 10, 0),
                true,
                event,
                (Player) user);

        ((Player) user).addSubscription(subscription1);

        repository.saveAllAndFlush(List.of(user));
        //when
        List<Subscription> subscriptionList = repository.findSubscriptionsForUserEmail(user.getUserEmail());
        //then
        assertTrue(List.of(subscription1).containsAll(subscriptionList));
    }*/


}