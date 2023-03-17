package com.ChatApplication.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
    private final String token;
    private final String type;
    private String username;
    private String message;

    public JwtResponse(String accessToken, String username, String message){
        this.token = accessToken;
        this.type = "Bearer";
        this.username = username;
        this.message = message;
    }
}
