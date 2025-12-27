package esgi.fyc.sso.authserver.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public class ClientDTO {

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Integer id;
    private String name;
    private Integer realmId;
    private Integer companyId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ClientDTO() {}

    public ClientDTO(Integer id, String name, Integer realmId, Integer companyId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.realmId = realmId;
        this.companyId = companyId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getRealmId() { return realmId; }
    public void setRealmId(Integer realmId) { this.realmId = realmId; }

    public Integer getCompanyId() { return companyId; }
    public void setCompanyId(Integer companyId) { this.companyId = companyId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

