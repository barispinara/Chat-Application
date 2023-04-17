package com.ChatApplication.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
    private final String token;
    private final String type;
    private UserResponse userResponse;
    private String message;

    public JwtResponse(String accessToken, UserResponse userResponse, String message){
        this.token = accessToken;
        this.type = "Bearer";
        this.userResponse = userResponse;
        this.message = message;
    }
}
