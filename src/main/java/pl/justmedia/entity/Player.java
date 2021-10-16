package pl.justmedia.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("PLAYER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Player extends User {
    private String playerFirstName;
    private String playerLastName;
    private LocalDate playerDOB;
    private String playerTeamName;
    private double playerWeight;
    private String playerAdditionalInfo;
    private String playerLicence;


    public Player(String userPassword,
                  String userLogin,
                  String userEmail,
                  String userCity,
                  String userStreet,
                  String userCountry,
                  String userZipCode,
                  String playerFirstName,
                  String playerLastName,
                  LocalDate playerDOB,
                  String playerTeamName,
                  double playerWeight,
                  String playerAdditionalInfo,
                  String playerLicence) {
        super(userPassword, userLogin, userEmail, userCity, userStreet, userCountry, userZipCode);
        this.playerFirstName = playerFirstName;
        this.playerLastName = playerLastName;
        this.playerDOB = playerDOB;
        this.playerTeamName = playerTeamName;
        this.playerWeight = playerWeight;
        this.playerAdditionalInfo = playerAdditionalInfo;
        this.playerLicence = playerLicence;
    }
}
