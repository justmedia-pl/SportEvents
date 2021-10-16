package pl.justmedia.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public abstract class User {
    @Id
    private UUID userId;
    @Column(name = "user_type", insertable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private UserType userType;
    private String userPassword;
    private String userLogin;
    private String userEmail;
    private String userCity;
    private String userStreet;
    private String userCountry;
    private String userZipCode;

    public User(@NonNull String userPassword,
                @NonNull String userLogin,
                @NonNull String userEmail,
                String userCity,
                String userStreet,
                String userCountry,
                String userZipCode) {
        this.userId = UUID.randomUUID();
        this.userPassword = userPassword;
        this.userLogin = userLogin;
        this.userEmail = userEmail;
        this.userCity = userCity;
        this.userStreet = userStreet;
        this.userCountry = userCountry;
        this.userZipCode = userZipCode;
    }

}
