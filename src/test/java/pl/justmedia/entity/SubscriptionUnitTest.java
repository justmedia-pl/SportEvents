package pl.justmedia.entity;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import pl.justmedia.service.dto.SubscriptionView;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.UUID;


class SubscriptionUnitTest {
    @Mock
    Player playerMock;
    @Mock
    Event eventMock;
    @Mock
    Subscription subscriptionMock;

    @Test
    public void shouldCreateSubscription() {

        Subscription subscription = new Subscription(
                true,
                LocalDateTime.now(),
                true,
                eventMock,
                playerMock);

        assertNotNull(subscription);
        assertNotNull(subscription.getSubscriptionId());
        assertEquals(subscription.getEvent(),eventMock);
        assertEquals(subscription.getPlayer(),playerMock);
    }
    @Test
    public void shouldCreateView(){
        String testTitle = "TITLE";

        Event eventMock = mock(Event.class);
        when(eventMock.getEventTitle()).thenReturn(testTitle);
        when(eventMock.getEventDate()).thenReturn(LocalDateTime.now());
        when(eventMock.getEventId()).thenReturn(UUID.randomUUID());
        Subscription subscription = new Subscription(
                true,
                LocalDateTime.now(),
                true,
                eventMock,
                playerMock);
        SubscriptionView subscriptionView = subscription.toView();
        assertEquals(subscriptionView.getEventTitle(),testTitle);
    }

}