package pl.justmedia.service.exception;

import lombok.NonNull;

public class EmailAlreadyExistException extends BusinesServiceException {
    public EmailAlreadyExistException(@NonNull String message) {
        super(message);
    }
}
