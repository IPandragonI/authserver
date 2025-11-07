package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.UserDTO;
import esgi.fyc.sso.authserver.mapper.UserMapper;
import esgi.fyc.sso.authserver.model.User;
import esgi.fyc.sso.authserver.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    // Récupérer tous les utilisateurs
    public List<UserDTO> getAllUsers() {
        try {
            return userRepository.findAll()
                    .stream()
                    .map(userMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve users: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    // Récupérer un utilisateur par son ID
    public UserDTO getUserById(Integer id) {
        try {
            Optional<User> userOpt = userRepository.findById(id);
            return userOpt.map(userMapper::toDto).orElse(null);
        } catch (Exception e) {
            System.err.println("Failed to retrieve user with ID " + id + ": " + e.getMessage());
            return null;
        }
    }

    // Créer un nouvel utilisateur
    public UserDTO createUser(UserDTO userDTO) {
        try {
            User user = userMapper.toEntity(userDTO);
            User savedUser = userRepository.save(user);
            return userMapper.toDto(savedUser);
        } catch (Exception e) {
            System.err.println("Failed to create user: " + e.getMessage());
            return null;
        }
    }

    // Mettre à jour un utilisateur existant
    public UserDTO updateUser(Integer id, UserDTO userDTO) {
        try {
            Optional<User> existingUserOpt = userRepository.findById(id);
            if (existingUserOpt.isEmpty()) {
                System.err.println("User not found with ID " + id);
                return null;
            }

            User user = existingUserOpt.get();
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getEmail());
            user.setEnabled(userDTO.getEnabled());
            user.setFirstname(userDTO.getFirstname());
            user.setLastname(userDTO.getLastname());
            user.setPassword(userDTO.getPassword());
            user.setVerifiedAt(userDTO.getVerifiedAt());

            User updatedUser = userRepository.save(user);
            return userMapper.toDto(updatedUser);
        } catch (Exception e) {
            System.err.println("Failed to update user with ID " + id + ": " + e.getMessage());
            return null;
        }
    }

    // Supprimer un utilisateur par son ID
    public boolean deleteUser(Integer id) {
        try {
            if (!userRepository.existsById(id)) {
                System.err.println("User not found with ID " + id);
                return false;
            }
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.err.println("Failed to delete user with ID " + id + ": " + e.getMessage());
            return false;
        }
    }
}
