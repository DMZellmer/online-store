package net.yorksolutions.backendforum;

import net.yorksolutions.backendforum.models.UserModel;
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
    @Value("${authUrl}")
    private String authUrl;
    @Autowired
    public ProductService(@NonNull ProductRepo repo) {
        this.repo = repo;
        this.restTemplate = new RestTemplate();
    }

    //  user auth and user info region
    public Boolean checkAuth(UUID currentUser) {
        try {
            ResponseEntity<Void> response = this.restTemplate.getForEntity(authUrl + "/checkAuth/" + currentUser, Void.class);
            return true;
        } catch (RestClientException e) {
            return false;
        }
    }
    public Boolean userIsOwner(UUID currentUser){
        ResponseEntity<Boolean> response = this.restTemplate.getForEntity(authUrl + "/getIsOwner/" + "&currentUser=" + currentUser, Boolean.class);
        return response.getBody();
    }

    public UserModel getUserInfo(UUID currentUser){
        ResponseEntity<UserModel> response = this.restTemplate.getForEntity(authUrl + "/userInfo/" + currentUser, UserModel.class);
        return response.getBody();
    }
    // end user auth/info region

    // product region
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
