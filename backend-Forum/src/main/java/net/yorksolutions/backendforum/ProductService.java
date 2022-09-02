package net.yorksolutions.backendforum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {
    private final ProductRepo repo;
    private RestTemplate restTemplate;

    private final String authUrl = "http://localhost:8080";

    public Boolean checkAuth(UUID currentUser) {
        try {
            ResponseEntity<Void> response = this.restTemplate.getForEntity(authUrl + "/checkAuth" + currentUser, Void.class);
            return true;
        } catch (RestClientException e) {
            return false;
        }
//        return response.getStatusCode() == HttpStatus.OK;
    }

    @Autowired
    public ProductService(@NonNull ProductRepo repo) {
        this.repo = repo;
        this.restTemplate = new RestTemplate();
    }

    // Needed when splitting backend into two servers (Auth, Prod)
    public Boolean userIsOwner(String username, UUID currentUser) {
        ResponseEntity<Boolean> response = this.restTemplate.getForEntity(authUrl + "/get-is-owner?username=" + username + "&currentUser=" + currentUser, Boolean.class);
        return response.getBody();
    }

    public void create(UUID owner, String name, Double price) {
        if (repo.existsByName(name))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Product with this name already exists");
        ProductList newProduct = new ProductList(owner, name, price);
        repo.save(newProduct);
    }

    public Iterable<ProductList> getProductList() {
        return this.repo.findAll();
    }

    public void edit(ProductList productList) {
        this.repo.save(productList);
    }

    public void delete(Long id) {
        Optional<ProductList> list = this.repo.findById(id);
        if (list.isEmpty())
            throw new ResponseStatusException(HttpStatus.GONE, "Product does not exist");
        this.repo.delete(list.get());
    }
}
