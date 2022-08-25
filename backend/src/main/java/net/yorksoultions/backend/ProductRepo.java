package net.yorksoultions.backend;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends CrudRepository<ProductList, Long> {
    Boolean existsByName(String name);
}
