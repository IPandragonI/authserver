package esgi.fyc.sso.authserver.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PlanDTO {

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Integer id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer maxUsers;
    private Integer maxRealms;
    private String features;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PlanDTO() {}

    public PlanDTO(Integer id, String name, String description, BigDecimal price, Integer maxUsers, Integer maxRealms, String features, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.maxUsers = maxUsers;
        this.maxRealms = maxRealms;
        this.features = features;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters et Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getMaxUsers() {
        return maxUsers;
    }

    public void setMaxUsers(Integer maxUsers) {
        this.maxUsers = maxUsers;
    }

    public Integer getMaxRealms() {
        return maxRealms;
    }

    public void setMaxRealms(Integer maxRealms) {
        this.maxRealms = maxRealms;
    }

    public String getFeatures() {
        return features;
    }

    public void setFeatures(String features) {
        this.features = features;
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

}
