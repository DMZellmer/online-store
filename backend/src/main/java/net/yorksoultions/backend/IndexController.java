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

    private final AuthService authService;
    private final ProductService productService;
    @Autowired
    public IndexController(@NonNull AuthService authService, @NonNull ProductService productService){
        this.authService = authService;
        this.productService = productService;
    }

    @GetMapping("/login")
    public UUID login(@RequestParam String username, @RequestParam String password) {
            return this.authService.login(username, password);
        }

    @GetMapping("/logout")
    public void logout(@RequestParam UUID currentUser){
        this.authService.logout(currentUser);
    }
    @GetMapping("/signup")
    public void signup(@RequestParam String username, @RequestParam String password){
        this.authService.signup(username, password, false);
    }
    @GetMapping("/createUser")
    public void createUser(@RequestParam String username, @RequestParam String password, @RequestParam Boolean isOwner){
        this.authService.createUser(username, password, isOwner);
    }
    @GetMapping("/createProductList")
    public void createProductList(@RequestParam UUID currentUser, String name, Double price){
        UUID loggedUser = this.authService.checkAuth(currentUser);
        this.productService.create(loggedUser, name, price);
    }

}
