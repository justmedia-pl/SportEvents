package pl.justmedia.entity;

import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@DiscriminatorValue("ORGANIZER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Organizer extends User {
    private String organizerName;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "organizer_id")
    private List<Event> organizerEvents;

    public Organizer(String userPassword,
                     String userLogin,
                     String userEmail,
                     String userCity,
                     String userStreet,
                     String userCountry,
                     String userZipCode,
                     @NotNull String organizerName) {
        super(userPassword, userLogin, userEmail, userCity, userStreet, userCountry, userZipCode);
        this.organizerName = organizerName;
        this.organizerEvents = new ArrayList<>();
    }

    @Override
    public String getName() {
        return organizerName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Organizer organizer = (Organizer) o;
        return organizerName.equals(organizer.organizerName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), organizerName);
    }
}
