package esgi.fyc.sso.authserver.model;

import jakarta.persistence.ManyToOne;

import java.io.Serializable;
import java.util.Objects;

// Classe ID composite
public class UserRoleId implements Serializable {

    private Integer roleId;
    private Integer userId;

    public UserRoleId() {
    }

    public UserRoleId(Integer roleId, Integer userId) {
        this.roleId = roleId;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserRoleId)) return false;
        UserRoleId that = (UserRoleId) o;
        return Objects.equals(roleId, that.roleId) && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleId, userId);
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
