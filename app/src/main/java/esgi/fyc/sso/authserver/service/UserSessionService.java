package esgi.fyc.sso.authserver.service;

import esgi.fyc.sso.authserver.dto.UserSessionDTO;
import esgi.fyc.sso.authserver.mapper.UserSessionMapper;
import esgi.fyc.sso.authserver.model.UserSession;
import esgi.fyc.sso.authserver.repository.UserSessionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserSessionService {

    private final UserSessionRepository userSessionRepository;
    private final UserSessionMapper userSessionMapper;

    public UserSessionService(UserSessionRepository userSessionRepository, UserSessionMapper userSessionMapper) {
        this.userSessionRepository = userSessionRepository;
        this.userSessionMapper = userSessionMapper;
    }

    // Get all sessions
    public List<UserSessionDTO> getAllSessions() {
        try {
            return userSessionRepository.findAll()
                    .stream()
                    .map(userSessionMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve all sessions: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    // Get a session by ID
    public Optional<UserSessionDTO> getSessionById(Integer id) {
        try {
            return userSessionRepository.findById(id)
                    .map(userSessionMapper::toDto);
        } catch (Exception e) {
            System.err.println("Failed to retrieve session by ID " + id + ": " + e.getMessage());
            return Optional.empty();
        }
    }

    // Get a session by token
    public Optional<UserSessionDTO> getSessionByToken(String token) {
        try {
            return userSessionRepository.findBySessionToken(token)
                    .map(userSessionMapper::toDto);
        } catch (Exception e) {
            System.err.println("Failed to retrieve session by token " + token + ": " + e.getMessage());
            return Optional.empty();
        }
    }

    // Get all sessions by user ID
    public List<UserSessionDTO> getSessionsByUserId(Integer userId) {
        try {
            return userSessionRepository.findByUserId(userId)
                    .stream()
                    .map(userSessionMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve sessions for userId=" + userId + ": " + e.getMessage());
            return Collections.emptyList();
        }
    }

    // Create or update a session
    public UserSessionDTO saveSession(UserSessionDTO dto) {
        try {
            UserSession userSession = userSessionMapper.toEntity(dto);
            UserSession saved = userSessionRepository.save(userSession);
            return userSessionMapper.toDto(saved);
        } catch (Exception e) {
            System.err.println("Failed to save session: " + e.getMessage());
            return null;
        }
    }

    // Delete a session by ID
    public boolean deleteSession(Integer id) {
        try {
            if (!userSessionRepository.existsById(id)) {
                System.err.println("Session not found for deletion, id=" + id);
                return false;
            }
            userSessionRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.err.println("Failed to delete session id=" + id + ": " + e.getMessage());
            return false;
        }
    }

    // Get all active (non-revoked) sessions
    public List<UserSessionDTO> getActiveSessions() {
        try {
            return userSessionRepository.findByRevokedFalse()
                    .stream()
                    .map(userSessionMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve active sessions: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    // Get all expired sessions
    public List<UserSessionDTO> getExpiredSessions() {
        try {
            return userSessionRepository.findByExpiresAtBefore(LocalDateTime.now())
                    .stream()
                    .map(userSessionMapper::toDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Failed to retrieve expired sessions: " + e.getMessage());
            return Collections.emptyList();
        }
    }
}
