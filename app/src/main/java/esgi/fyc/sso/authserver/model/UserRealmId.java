package esgi.fyc.sso.authserver.model;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserRealmId implements Serializable {

    private Integer realmId;
    private Integer userId;

    public UserRealmId() {}
    public UserRealmId(Integer realmId, Integer userId) {
        this.realmId = realmId;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserRealmId)) return false;
        UserRealmId that = (UserRealmId) o;
        return Objects.equals(realmId, that.realmId) && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(realmId, userId);
    }

    public Integer getRealmId() {
        return realmId;
    }

    public void setRealmId(Integer realmId) {
        this.realmId = realmId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

}
