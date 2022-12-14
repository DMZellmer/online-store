package net.yorksoultions.backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserAccountRepo repo;
    private HashMap<UUID, UUID> tokenMap;

    @Autowired
    public AuthService(@NonNull UserAccountRepo repo) {
        this.repo = repo;
        this.tokenMap = new HashMap<>();
    }

    public ResponseEntity<Void> checkAuth(UUID currentUser) {
        if (!tokenMap.containsKey(currentUser)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public boolean userIsOwner(UUID currentUser) {
        Optional<UserAccount> user = this.repo.findById(this.tokenMap.get(currentUser));
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        if (user.get().isOwner && user.get().id.equals(this.tokenMap.get(currentUser))) {
            return true;
        }
        return false;
    }

    public UUID login(String username, String password) {
        Optional<UserAccount> maybeUser = this.repo.findByUsernameAndPassword(username, password);
        if (maybeUser.isEmpty())
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Username and/or Password not found");
        UUID token = UUID.randomUUID();
        UserAccount user = maybeUser.get();
        this.tokenMap.put(token, user.id);
        return token;
    }

    public void logout(UUID currentUser) {
        if (!tokenMap.containsKey(currentUser))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CURRENT USER DOES NOT EXIST");
        tokenMap.remove(currentUser);
    }

    public void signup(String username, String password, Boolean isOwner) {
        if (repo.existsByUsername(username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "USER ALREADY EXISTS");
        }
        UserAccount newUser = new UserAccount(username, password, isOwner);
        repo.save(newUser);
    }

    public void createUser(String username, String password, Boolean isOwner) {
        if (repo.existsByUsername(username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "USER ALREADY EXISTS");
        }
        UserAccount newUser = new UserAccount(username, password, isOwner);
        repo.save(newUser);
    }

    public Iterable<UserAccount> getUserList() {
        return this.repo.findAll();
    }

    public void edit(UserAccount user) {
        this.repo.save(user);
    }

    public void deleteUser(UUID id) {
        Optional<UserAccount> list = this.repo.findById(id);
        if (list.isEmpty())
            throw new ResponseStatusException(HttpStatus.GONE, "User does not exist");
        this.repo.delete(list.get());
    }

    public UserAccount userInfo(UUID currentUser) {
        UUID loggedUser = this.tokenMap.get(currentUser);
        Optional<UserAccount> maybeUser = repo.findById(loggedUser);
        if (maybeUser.isEmpty()){
            throw new ResponseStatusException(HttpStatus.GONE);
        }
        return maybeUser.get();
    }
}
