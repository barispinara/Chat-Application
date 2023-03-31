package com.ChatApplication.controller;


import com.ChatApplication.ChatApplicationSecurity;
import com.ChatApplication.config.WebSecurityConfig;
import com.ChatApplication.model.User;
import com.ChatApplication.payload.request.LoginRequest;
import com.ChatApplication.payload.request.RegisterRequest;
import com.ChatApplication.security.jwt.AuthEntryPointJwt;
import com.ChatApplication.security.jwt.JwtUtils;
import com.ChatApplication.security.jwt.PasswordEncoder;
import com.ChatApplication.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Import(WebSecurityConfig.class)
@WebMvcTest(UserController.class)
public class UserControllerTest extends ChatApplicationSecurity {
    @Autowired
    private MockMvc mockMvc;

    static LoginRequest loginRequest;
    static RegisterRequest registerRequest;
    static User user;
    static Authentication authentication;
    static ObjectMapper mapper;
    static ObjectWriter ow;

    @BeforeAll
    static void setUp(){
        registerRequest = RegisterRequest.builder()
                .username("test")
                .password("12345")
                .firstName("hello")
                .lastName("world")
                .build();

        loginRequest = LoginRequest.builder()
                .username("test")
                .password("12345")
                .build();

        user = new User("test" , "12345" , "hello" , "world");
        authentication = new UsernamePasswordAuthenticationToken(user, loginRequest.getPassword());
        mapper = new ObjectMapper().configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ow = mapper.writer().withDefaultPrettyPrinter();
    }

    @Test
    public void registerUserNotExists() throws Exception{
        //If username does not exist in the database
        when(userService.existsByUsername(registerRequest.getUsername())).thenReturn(false);

        String requestJson = ow.writeValueAsString(registerRequest);

        mockMvc.perform(
                post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpectAll(
                        status().isOk(),
                        jsonPath("$.message").value("User registered successfully"),
                        jsonPath("$.username").value(registerRequest.getUsername())
                );
    }

    @Test
    public void registerUserAlreadyExists() throws Exception{
        //If username exists
        when(userService.existsByUsername(registerRequest.getUsername())).thenReturn(true);

        String requestJson = ow.writeValueAsString(registerRequest);

        mockMvc.perform(
                post("/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpectAll(
                        status().isBadRequest(),
                        jsonPath("$.message").value("Username is already taken."),
                        jsonPath("$.username").value(registerRequest.getUsername())
                );
    }

    @Test
    public void loginWithAuthentication() throws Exception{
        when(authenticationManager.authenticate(isA(UsernamePasswordAuthenticationToken.class))).thenReturn(authentication);
        when(jwtUtils.generateJwtToken(authentication)).thenReturn("JwtToken");

        String requestJson = ow.writeValueAsString(loginRequest);

        mockMvc.perform(
                post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpectAll(
                        status().isOk(),
                        jsonPath("$.token").value("JwtToken"),
                        jsonPath("$.username").value(loginRequest.getUsername())
                );
    }

    @Test
    public void logoutNotValidToken() throws Exception{
        String testToken = "JwtToken";

        when(userService.findUserFromJwtToken(testToken)).thenReturn(null);

        mockMvc.perform(
                post("/user/logout")
                        .header("Authorization" , "Bearer " + testToken))
                .andExpectAll(
                        status().isUnauthorized()
                );
    }

}
