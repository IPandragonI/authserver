package esgi.fyc.sso.authserver.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "user_realm")
public class UserRealm {

    @EmbeddedId
    private UserRealmId id;

    @MapsId("realmId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "realm_id", nullable = false)
    private Realm realm;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "added_at")
    private LocalDateTime addedAt;

    @Column(name = "last_access")
    private LocalDateTime lastAccess;

    @Column(name="created_at", nullable=false,updatable=false)
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;


    public UserRealm() {
    }

    public UserRealm(Realm realm, User user, LocalDateTime addedAt, LocalDateTime lastAccess) {
        this.realm = realm;
        this.user = user;
        this.addedAt = addedAt;
        this.lastAccess = lastAccess;
    }

    // Getters et Setters
    public Realm getRealm() {
        return realm;
    }

    public void setRealm(Realm realm) {
        this.realm = realm;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }

    public LocalDateTime getLastAccess() {
        return lastAccess;
    }

    public void setLastAccess(LocalDateTime lastAccess) {
        this.lastAccess = lastAccess;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UserRealmId getId() {
        return id;
    }

    public void setId(UserRealmId id) {
        this.id = id;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}

