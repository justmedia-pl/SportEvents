package pl.justmedia.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.justmedia.service.EventQuery;
import pl.justmedia.service.UserQuery;
import pl.justmedia.service.dto.EventDetails;
import pl.justmedia.service.dto.EventView;
import pl.justmedia.service.dto.PlayerDetails;
import pl.justmedia.service.dto.PlayerView;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping(value="/api/events",produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class EventViewRestController {

        @NonNull
        private final EventQuery query;

        @GetMapping
            // default mapping
        List<EventView> getEvents() {
            return query.listEvents();
        }
        @GetMapping(value="/{eventId}",produces = MediaType.APPLICATION_JSON_VALUE)
        EventDetails getEvent(@PathVariable UUID eventId){
            return query.getEventDetails(eventId);
        }
    }

