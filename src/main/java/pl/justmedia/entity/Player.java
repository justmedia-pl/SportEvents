package pl.justmedia.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import pl.justmedia.service.dto.RegisterOrganizerForm;
import pl.justmedia.service.dto.RegisterPlayerForm;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
    private String playerPhone;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "player_id")
    private List<Subscription> playerSubscriptions;

    public Player(String userPassword,
                  String userLogin,
                  String userEmail,
                  String userCity,
                  String userStreet,
                  String userCountry,
                  String userZipCode,
                  @NonNull String playerFirstName,
                  @NonNull String playerLastName,
                  @NonNull LocalDate playerDOB,
                  String playerTeamName,
                  double playerWeight,
                  String playerAdditionalInfo,
                  String playerLicence,
                  @NonNull String playerPhone) {
        super(userPassword, userLogin, userEmail, userCity, userStreet, userCountry, userZipCode);
        this.playerFirstName = playerFirstName;
        this.playerLastName = playerLastName;
        this.playerDOB = playerDOB;
        this.playerTeamName = playerTeamName;
        this.playerWeight = playerWeight;
        this.playerAdditionalInfo = playerAdditionalInfo;
        this.playerLicence = playerLicence;
        this.playerPhone = playerPhone;
        this.playerSubscriptions = new ArrayList<>();
    }


  public static Player createWith(RegisterPlayerForm form) {
   DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    return new  Player(form.getUserPassword(),
            form.getUserLogin(),
            form.getUserEmail(),
            form.getUserCity(),
            form.getUserStreet(),
            form.getUserCountry(),
            form.getUserZipCode(),
            form.getPlayerFirstName(),
            form.getPlayerLastName(),
            LocalDate.parse(form.getPlayerDOB(),formatter),
            form.getPlayerTeamName(),
            Double.valueOf(form.getPlayerWeight()),
            form.getPlayerAdditionalInfo(),
            form.getPlayerLicence(),
            form.getPlayerPhone());
    }
    @Override
    public String getName() {
        return playerFirstName + " " + playerLastName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Player player = (Player) o;
        return playerFirstName.equals(player.playerFirstName)
                && playerLastName.equals(player.playerLastName)
                && playerDOB.equals(player.playerDOB)
                && playerPhone.equals(player.playerPhone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), playerFirstName, playerLastName, playerDOB, playerPhone);
    }

    public void addSubscription(Subscription subscription){
        if(subscription != null && !playerSubscriptions.contains(subscription)){
            playerSubscriptions.add(subscription);
        }
    }
    public List<Subscription> getApprovedSubscriptions(){
        List<Subscription> apporved = new ArrayList<>();
        for (Subscription subscription : playerSubscriptions){
            apporved.add(subscription);
        }
        return apporved;
    }
}
