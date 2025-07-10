package esgi.fyc.sso.authserver.entity;

import esgi.fyc.sso.authserver.entity.businessObject.BusinessObject;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User extends BusinessObject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String firstname;

    @Column(nullable = false, unique = true, length = 100)
    private String lastname;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private boolean enabled;

    public User() {
        super();
    }

    public User(String firstname, String lastname, String username, String password, String email, boolean enabled) {
        super(java.time.LocalDateTime.now(), java.time.LocalDateTime.now());
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.enabled = enabled;
    }

    public Long getId() {
        return id;
    }
    public String getFirstname() {
        return firstname;
    }
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public boolean isEnabled() {
        return enabled;
    }
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}