package esgi.fyc.sso.authserver.form;

import jakarta.validation.constraints.NotBlank;

public class RefreshTokenForm {

    @NotBlank(message = "Le refresh token est obligatoire")
    private String refreshToken;

    public RefreshTokenForm() {}

    public RefreshTokenForm(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
