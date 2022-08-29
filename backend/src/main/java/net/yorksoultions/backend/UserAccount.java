package net.yorksoultions.backend;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    UUID id;
    @JsonProperty
    String username;
    @JsonProperty
    String password;
    @JsonProperty
    Boolean isOwner;

    // Empty constructor for Springboot to "do it's thing"
    public UserAccount(){}

    public UserAccount(String username, String password, Boolean isOwner){
        this.username = username;
        this.password = password;
        this.isOwner = isOwner;
    }

    @Override
    public String toString(){
        return String.format("%b", // specifies b=boolean type, e.g. %s=string, %i=integer, %f=float
                this.isOwner);
    }
}
