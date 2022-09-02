package net.yorksolutions.backendforum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(@NonNull ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/test")
    public String hello() {
        return "Testing";
    }

    @GetMapping("/createProduct")
    public void createProduct(
            @RequestParam UUID currentUser,
            @RequestParam String name,
            @RequestParam Double price) {
        this.productService.checkAuth(currentUser);
        if (this.productService.checkAuth(currentUser)) {
            this.productService.create(loggedUser, name, price);

        } else throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only owners can add products");
    }
//
//    @GetMapping("/getProductList")
//    public Iterable<ProductList> productList() {
//        return this.productService.getProductList();
//    }
//
//    @PostMapping("/editProductList")
//    public void editProductList(@RequestParam UUID currentUser, @RequestBody ProductList productList) {
//        this.authService.checkAuth(currentUser);
//        if (this.authService.userIsOwner((currentUser))) {
//            this.productService.edit(productList);
//        } else throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only owners can edit products");
//    }
//
//    @DeleteMapping("/deleteProductList")
//    public void deleteProductList(@RequestParam UUID currentUser, @RequestParam Long id) {
//        this.authService.checkAuth(currentUser);
//        if (this.authService.userIsOwner(currentUser)) {
//            this.productService.delete(id);
//        } else throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only owners can delete products");
//    }
}
