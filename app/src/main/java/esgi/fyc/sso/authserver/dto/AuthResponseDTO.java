package esgi.fyc.sso.authserver.dto;

import java.util.List;

public class AuthResponseDTO {

    private String token;
    private String refreshToken;
    private String type = "Bearer";
    private String username;
    private String email;
    private List<String> roles;

    public AuthResponseDTO(String token, String refreshToken, String username, String email, List<String> roles) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
