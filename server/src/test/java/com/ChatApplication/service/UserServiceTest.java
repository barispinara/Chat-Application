package com.ChatApplication.service;


import com.ChatApplication.model.User;
import com.ChatApplication.payload.request.RegisterRequest;
import com.ChatApplication.repository.UserRepository;
import com.ChatApplication.security.jwt.PasswordEncoder;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private UserService userService;

    static RegisterRequest registerRequest;
    static User dbUser;

    @BeforeAll
    static void setUp(){
        registerRequest = RegisterRequest.builder()
                .username("test")
                .password("12345")
                .firstName("hello")
                .lastName("world")
                .build();

        dbUser = new User("test" , "encoded" , "hello", "world");
        dbUser.setId(1L);
    }

    @Test
    public void registerUser(){
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn("encoded");
        when(userRepository.save(isA(User.class))).thenReturn(dbUser);

        User returnedUser = userService.registerUser(registerRequest);
        assertEquals(dbUser, returnedUser);
    }

    @Test
    public void loadUserByUsernameExists(){
        when(userRepository.findUserByUsername(isA(String.class))).thenReturn(Optional.ofNullable(dbUser));

        User returnedUser = userService.loadUserByUsername(registerRequest.getUsername());
        assertEquals(dbUser , returnedUser);
    }

    @Test
    public void loadUserByUsernameNotExists(){
        when(userRepository.findUserByUsername(isA(String.class))).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername(registerRequest.getUsername()));
    }
}
