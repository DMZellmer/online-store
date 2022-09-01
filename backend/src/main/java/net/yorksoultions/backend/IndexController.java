package net.yorksoultions.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@CrossOrigin
public class IndexController {

    private final AuthService authService;
    private final ProductService productService;

    @Autowired
    public IndexController(@NonNull AuthService authService, @NonNull ProductService productService) {
        this.authService = authService;
        this.productService = productService;
    }

    @GetMapping("/login")
    public UUID login(@RequestParam String username, @RequestParam String password) {
        return this.authService.login(username, password);
    }

    @GetMapping("/logout")
    public void logout(@RequestParam UUID currentUser) {
        this.authService.logout(currentUser);
    }

    @GetMapping("/signup")
    public void signup(@RequestParam String username, @RequestParam String password) {
        this.authService.signup(username, password, false);
    }

    @GetMapping("/createUser")
    public void createUser(@RequestParam String username, @RequestParam String password, @RequestParam Boolean isOwner) {
        this.authService.createUser(username, password, isOwner);
    }

    @GetMapping("/userList")
    public Iterable<UserAccount> userList() {
        return this.authService.getUserList();
    }

    @PostMapping("/editUserList")
    public void editUserList(@RequestParam UUID currentUser, @RequestBody UserAccount user) {
        this.authService.checkAuth(currentUser);
        if (this.authService.userIsOwner(currentUser)) {
            this.authService.edit(user);
        } else throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only owners can edit users");
    }

    @DeleteMapping("/deleteUserList")
    public void deleteUserList(@RequestParam UUID currentUser, @RequestParam UUID id) {
        this.authService.checkAuth(currentUser);
        if (this.authService.userIsOwner(currentUser)) {
            this.authService.deleteUser(id);
        } else throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only owners can delete users");

    }

    @GetMapping("/createProduct")
    public void createProduct(
            @RequestParam UUID currentUser,
            @RequestParam String name,
            @RequestParam Double price) {
        UUID loggedUser = this.authService.checkAuth(currentUser);
        if (this.authService.userIsOwner(currentUser)) {
            this.productService.create(loggedUser, name, price);
        } else throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only owners can add products");
    }

    @GetMapping("/getProductList")
    public Iterable<ProductList> productList() {
        return this.productService.getProductList();
    }

    @PostMapping("/editProductList")
    public void editProductList(@RequestParam UUID currentUser, @RequestBody ProductList productList) {
        this.authService.checkAuth(currentUser);
        if (this.authService.userIsOwner((currentUser))) {
            this.productService.edit(productList);
        } else throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only owners can edit products");
    }

    @DeleteMapping("/deleteProductList")
    public void deleteProductList(@RequestParam UUID currentUser, @RequestParam Long id) {
        this.authService.checkAuth(currentUser);
        if (this.authService.userIsOwner(currentUser)) {
            this.productService.delete(id);
        } else throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only owners can delete products");
    }
}
