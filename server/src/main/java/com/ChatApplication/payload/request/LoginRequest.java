package com.ChatApplication.payload.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class LoginRequest {
    private String username;
    private String password;
}
