package pl.justmedia.entity;

import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import pl.justmedia.service.dto.EventDetails;
import pl.justmedia.service.dto.EventView;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class EventUnitTest {
    Event event = new Event();

    @BeforeEach
    public void setup() {
        Organizer mockOrganizer = Mockito.mock(Organizer.class);
        Mockito.when(mockOrganizer.getUserId()).thenReturn(UUID.randomUUID());
        Subscription mockSubscription = Mockito.mock(Subscription.class);
        List<Subscription> subscriptionList = new ArrayList<>();
        subscriptionList.add(mockSubscription);
        event.setOrganizer(mockOrganizer);
        event.setEventId(UUID.randomUUID());
        event.setEventTitle("EventTitle");
        event.setEventDate(LocalDateTime.now());
        event.setEventPlayerLimit(10);
        event.setEventFee(0.0d);
        event.setEventSubscriptions(subscriptionList);
    }
    @Test
    void toView() {

        //given setup()

        //when
        EventView eventView = event.toView();
        //Then
        assertNotNull(eventView.getEventId());
        assertNotNull(eventView.getEventDate());
        assertEquals(eventView.getEventPlayerLimit(),10);
        assertEquals(eventView.getSubscriptionsCount(),1);
    }

    @Test
    void viewDetail() {
        //given setup()
        //when
        EventDetails eventDetails = event.viewDetail();
        //then
        assertNotNull(eventDetails.getEventId());
        assertNotNull(eventDetails.getEventDate());
        assertEquals(eventDetails.getEventPlayerLimit(),10);
        assertEquals(eventDetails.getPlayerSubscriptions().size(),1);
    }
}