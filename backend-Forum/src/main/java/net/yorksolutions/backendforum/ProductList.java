package net.yorksolutions.backendforum;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class ProductList {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    Long id;
    @JsonProperty
    UUID owner;
    @JsonProperty
    String name;
    @JsonProperty
    Double price;
    @JsonProperty
    Integer inventory;

    public ProductList() {

    }

    public ProductList(UUID owner, String name, Double price) {
        this.owner = owner;
        this.name = name;
        this.price = price;
    }
}
