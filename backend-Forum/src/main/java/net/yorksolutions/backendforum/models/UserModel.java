package net.yorksolutions.backendforum.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class UserModel {
    @JsonProperty
    public UUID id;
    @JsonProperty
    public String username;
    @JsonProperty
    public String password;
}
