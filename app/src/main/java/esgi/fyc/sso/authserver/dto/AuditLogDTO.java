package esgi.fyc.sso.authserver.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;

public class AuditLogDTO implements Serializable {

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Integer id;
    private String action;
    private String description;
    private String ip;
    private String ua;
    private Integer realmId;
    private Integer userId;

    // Constructeurs
    public AuditLogDTO() {
    }

    public AuditLogDTO(Integer id, String action, String description, String ip, String ua, Integer realmId, Integer userId) {
        this.id = id;
        this.action = action;
        this.description = description;
        this.ip = ip;
        this.ua = ua;
        this.realmId = realmId;
        this.userId = userId;
    }

    // Getters et Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getUa() {
        return ua;
    }

    public void setUa(String ua) {
        this.ua = ua;
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
