package pl.justmedia.service.exception;

public class TokenValidationException extends BusinessServiceException {
    public TokenValidationException(String message) {
        super(message);
    }
}
