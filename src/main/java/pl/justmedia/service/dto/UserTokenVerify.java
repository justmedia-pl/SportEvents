package pl.justmedia.service.dto;

import lombok.NonNull;
import lombok.Value;

import java.util.UUID;

@Value
public class UserTokenVerify {
    @NonNull
    UUID userId;
    UUID tokenId;
}
