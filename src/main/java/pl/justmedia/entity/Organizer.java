package pl.justmedia.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("ORAGANIZATOR")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Organizer extends User {
    private String organizerName;

    public Organizer(String userPassword,
                     String userLogin,
                     String userEmail,
                     String userCity,
                     String userStreet,
                     String userCountry,
                     String userZipCode,
                     String organizatorName) {
        super(userPassword, userLogin, userEmail, userCity, userStreet, userCountry, userZipCode);
        this.organizerName = organizatorName;
    }
}
