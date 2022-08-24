package net.yorksoultions.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@CrossOrigin
public class IndexController {

    private final AuthService service;
    @Autowired
    public IndexController(@NonNull AuthService service){
        this.service = service;
    }

    @GetMapping("/login")
    public UUID login(@RequestParam String username, @RequestParam String password) {
            return this.service.login(username, password);
        }

    @GetMapping("/logout")
    public void logout(@RequestParam UUID currentUser){
        this.service.logout(currentUser);
    }
    @GetMapping("/signup")
    public void signup(@RequestParam String username, @RequestParam String password){
        this.service.signup(username, password, false);
    }
    @GetMapping("/createUser")
    public void createUser(@RequestParam String username, @RequestParam String password, @RequestParam Boolean isOwner){
        this.service.createUser(username, password, isOwner);
    }

}
