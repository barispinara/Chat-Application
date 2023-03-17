package com.ChatApplication.payload.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
}