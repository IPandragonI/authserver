# Création des mappers - Avant de commencer

Un mapper représente la liaison entre notre entité et notre DTO. Cette classe est là pour faire le lien entre les deux types d'objets, et en transmettre les données. Il faudra créer un mapper pour faire le lien entre **chaque entité et chaque DTO de notre application**. Avant de créer nos mappers, de petites explications s'imposent :

- pour que la liaison entre entité et DTO fonctionne, il faut **obligatoirement avoir un mapper pour faire le lien entre les deux**.
- un mapper doit être capable de **transmettre les données d'une entité vers un DTO, et de transmettre des données d'un DTO vers une entité**.

exemple :

```java
@Component
public class RoleMapper {

    public RoleDTO toDto(Role role) {
        if (role == null) {
            return null;
        }
        RoleDTO dto = new RoleDTO();
        dto.setId(role.getId());
        dto.setName(role.getName());
        dto.setDescription(role.getDescription());
        dto.setCreatedAt(role.getCreatedAt());
        dto.setUpdatedAt(role.getUpdatedAt());
        return dto;
    }

    public Role toEntity(RoleDTO dto) {
        if (dto == null) {
            return null;
        }
        Role role = new Role();
        role.setId(dto.getId());
        role.setName(dto.getName());
        role.setDescription(dto.getDescription());
        role.setCreatedAt(dto.getCreatedAt());
        role.setUpdatedAt(dto.getUpdatedAt());
        return role;
    }
}

```

Dans cet exemple, toDTO va convertir une entité Role passée en paramètre en objet DTO, tandis que toEntity va convertir un DTO passé en paramètre en entité. Le mapper a donc bien un rôle de convertisseur entre entité et DTO.

Dans la prochaine section du cours, nous allons créer les mappers de sorte à ce qu'ils puissent faire la conversion entre DTO et entité.