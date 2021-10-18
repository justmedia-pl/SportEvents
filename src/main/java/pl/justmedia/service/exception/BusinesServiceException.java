package pl.justmedia.service.exception;


public class BusinesServiceException extends RuntimeException{
    public BusinesServiceException(String messeage){
        super(messeage);
    }
    public BusinesServiceException(String message, Throwable cause){
        super(message,cause);
    }
}
