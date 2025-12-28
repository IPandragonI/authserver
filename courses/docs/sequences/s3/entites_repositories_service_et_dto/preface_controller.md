# Création des controllers - Avant de commencer

Dans cette partie, nous allons créer des **controllers**. Ces controllers vont nous servir à définir des routes pour effectuer diverses actions depuis notre API. Chaque route doit être unique, et effectuer une action qui lui est propre.

## Classe

- un controller est une classe qui utilise un service. Il doit donc avoir un attribut correspondant au service de l'entité.
- un controller, quand déclaré, doit être précédé de l'annotation **"RestController"**, pour signaler qu'on va fournir des requêtes de type REST.
- un controller doit avoir un/plusieurs constructeurs, qui lui permettront de construire un objet utilisable.
- un controller doit avoir une route définie avec l'annotation **'RequestMapping("/api/[route]")'**

exemple :

```java
@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }
}
```

## Méthodes

- Chaque controller doit fournir des routes permettant d'effectuer des actions liées à l'entité à laquelle il correspond.
- Chaque action définie doit être disponible via une route **unique** et effectuer une action précise.
- C'est également dans ces routes qu'il faut effectuer la **gestion des erreurs**.

### Mapping des routes

- Lorsqu'on définit une route, il faut définir de quel type de route il s'agit :
  - POST => Requête où on crée des données dans l'API => on utilise le tag "@PostMapping".
  - GET => Requête où on récupère des données dans l'API => on utilise le tag "@GetMapping".
  - PUT => Requête où on insère des données à un ensemble existant, dans l'API => on utilise le tag "@PutMapping".
  - DELETE => Requête où l'on supprime des données dans l'API => on utilise le tag "@DeleteMapping".

exemples de route :

```java
/**
* Créer un rôle
* POST /api/roles
*/
@PostMapping
public ResponseEntity<RoleDTO> createRole(@RequestBody RoleDTO roleDTO) {
    RoleDTO created = roleService.createRole(roleDTO);
    if (created == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    return new ResponseEntity<>(created, HttpStatus.CREATED);
}

/**
* Lister tous les rôles
* GET /api/roles
*/
@GetMapping
public ResponseEntity<List<RoleDTO>> getAllRoles() {
    List<RoleDTO> roles = roleService.getAllRoles();
    return ResponseEntity.ok(roles);
}

/**
* Mettre à jour un rôle
* PUT /api/roles/{id}
*/
@PutMapping("/{id}")
public ResponseEntity<RoleDTO> updateRole(@PathVariable Integer id, @RequestBody RoleDTO roleDTO) {
    RoleDTO updated = roleService.updateRole(id, roleDTO);
    if (updated == null) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(updated);
}

/**
* Supprimer un rôle
* DELETE /api/roles/{id}
*/
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteRole(@PathVariable Integer id) {
    boolean deleted = roleService.deleteRole(id);
    if (!deleted) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.noContent().build();
}
```