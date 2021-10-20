package pl.justmedia.service.dto;

import lombok.NonNull;
import lombok.Value;
import pl.justmedia.entity.Subscription;
import pl.justmedia.entity.UserType;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Value
public class PlayerDetails {
    UUID userId;
    String name;
    String email;
    UserType type;
    List<Subscription> playerSubscriptions;
    String userCity;
    String userStreet;
    String userCountry;
    String userZipCode;
    String playerFirstName;
    String playerLastName;
    String playerDOB;
    String playerTeamName;
    String playerWeight;
    String playerAdditionalInfo;
    String playerLicence;
    String playerPhone;
}
