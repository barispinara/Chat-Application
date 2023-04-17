package com.ChatApplication.controller;


import com.ChatApplication.model.User;
import com.ChatApplication.payload.request.LoginRequest;
import com.ChatApplication.payload.request.RegisterRequest;
import com.ChatApplication.payload.response.JwtResponse;
import com.ChatApplication.payload.response.MessageResponse;
import com.ChatApplication.payload.response.UserResponse;
import com.ChatApplication.security.jwt.AuthTokenFilter;
import com.ChatApplication.security.jwt.JwtUtils;
import com.ChatApplication.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final AuthTokenFilter authTokenFilter;
    private final JwtUtils jwtUtils;

    @PostMapping(value = "/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
        if (userService.existsByUsername(registerRequest.getUsername())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Username is already taken." , registerRequest.getUsername()));
        }

        userService.registerUser(registerRequest);

        return ResponseEntity
                .ok(new MessageResponse("User registered successfully" , registerRequest.getUsername()));
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User user = (User) authentication.getPrincipal();
        userService.updateLastSeenAt(user, "Online");

        return ResponseEntity
                .ok()
                .body(new JwtResponse(
                        jwt,
                        new UserResponse(user.getUsername(), user.getFullName(), user.getLastSeenAt()),
                        "Login is successful"
                ));
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<?> logoutUser(@RequestHeader("Authorization") String jwtToken){
        User user = userService.findUserFromJwtToken(jwtToken);

        if(user == null){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Jwt Token");
        }

        SimpleDateFormat dateFormatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date currentDate = new Date();
        String strDate = dateFormatter.format(currentDate);
        userService.updateLastSeenAt(user , strDate);
        return ResponseEntity
                .ok()
                .body(new MessageResponse("Logout was successful" , user.getUsername()));

    }

    @DeleteMapping(value = "/delete/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable("username") String username,
                                        @RequestHeader("Authorization") String jwtToken){

        User user = userService.findUserFromJwtToken(jwtToken);

        if(user == null){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Jwt Token");
        }

        if(!user.getUsername().equals(username)){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("User only can delete itself" , username));
        }

        userService.deleteUser(user);
        return ResponseEntity
                .ok()
                .body(new MessageResponse("User deleted successfully" , username));
    }

    @GetMapping(value = "/profile")
    public ResponseEntity<?> getUser(@RequestHeader("Authorization") String jwtToken){
        User user = userService.findUserFromJwtToken(jwtToken);

        if(user == null){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Jwt Token");
        }

        return ResponseEntity
                .ok()
                .body(new UserResponse(user.getUsername(), user.getFullName(), user.getLastSeenAt()));
    }

    @GetMapping(value = "/getAllUser")
    public ResponseEntity<?> getAllUser(@RequestHeader("Authorization") String jwtToken){
        User user = userService.findUserFromJwtToken(jwtToken);
        if(user == null){
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Jwt Token");
        }

        List<UserResponse> userList = userService.getAllUsers();
        userList.removeIf(s -> s.getUsername().equals(user.getUsername()));
        return ResponseEntity
                .ok()
                .body(userList);
    }
}
