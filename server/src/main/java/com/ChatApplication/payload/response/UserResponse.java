package com.ChatApplication.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
public class UserResponse {
    private String username;
    private String firstName;
    private String lastName;
    private String lastSeenAt;
}
