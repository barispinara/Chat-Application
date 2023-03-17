package com.ChatApplication;

import com.ChatApplication.repository.UserRepository;
import com.ChatApplication.security.jwt.AuthEntryPointJwt;
import com.ChatApplication.security.jwt.JwtUtils;
import com.ChatApplication.security.jwt.PasswordEncoder;
import com.ChatApplication.service.UserService;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;

public class ChatApplicationSecurity {
    @MockBean
    protected UserService userService;
    @MockBean
    protected AuthenticationManager authenticationManager;
    @MockBean
    protected JwtUtils jwtUtils;
    @MockBean
    protected AuthEntryPointJwt authEntryPointJwt;
    @MockBean
    protected PasswordEncoder passwordEncoder;
    @MockBean
    protected UserRepository userRepository;
}
