package pl.justmedia.service.exception;

import lombok.NonNull;

public class EventException extends BusinesServiceException {
    public EventException (@NonNull String message) {
        super(message);
    }
}

