package pl.justmedia.service.dto;

import lombok.NonNull;
import lombok.Value;

import java.util.UUID;

@Value
public class EditPlayerForm {
    UUID userId;
    String userPassword;
    String userLogin;
    String userEmail;
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
