package pl.justmedia.entity;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;

class UserUnitTest {

    @Test
    public void shouldCreateUser() {
        User user = new User(
                "userPassword",
                "userLogin",
                "userEmail",
                "userCity",
                "userStreet",
                "userCountry",
                "userZipCode") {
            @Override
            public String getName() {
                return null;
            }
        };

        assertNotNull(user);
        assertTrue(user.getUserId() != null);
    }

    @Test
    public void shouldDeactivateUser(){
        User userMock = Mockito.mock(User.class);
        userMock.setUserActive(false);

        assertFalse(userMock.isUserActive());
    }

}