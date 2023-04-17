package com.ChatApplication.service;


import com.ChatApplication.model.User;
import com.ChatApplication.payload.request.RegisterRequest;
import com.ChatApplication.payload.response.UserResponse;
import com.ChatApplication.repository.UserRepository;
import com.ChatApplication.security.jwt.JwtUtils;
import com.ChatApplication.security.jwt.PasswordEncoder;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Override
    @Transactional
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with given username: " + username));
    }

    public boolean existsByUsername(String username) throws UsernameNotFoundException{
        return userRepository.existsByUsername(username);
    }

    public User registerUser(RegisterRequest registerRequest){
        User user = new User(
                registerRequest.getUsername(),
                passwordEncoder.encode(registerRequest.getPassword()),
                registerRequest.getFirstName(),
                registerRequest.getLastName()
        );
        SimpleDateFormat dateFormatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date currentDate = new Date();
        String strDate = dateFormatter.format(currentDate);
        updateLastSeenAt(user, strDate);

        return userRepository.save(user);
    }

    public void deleteUser(User user){
        userRepository.deleteById(user.getId());
    }

    public void updateLastSeenAt(User user, String lastSeenAt){
        user.setLastSeenAt(lastSeenAt);
        userRepository.save(user);
    }

    public String parseJwtToken(String jwtToken){
        if(StringUtils.hasText(jwtToken) && jwtToken.startsWith("Bearer ")){
            return jwtToken.substring(7);
        }
        return null;
    }

    public User findUserFromJwtToken(String jwtToken){
        try{
            String parsedJwtToken = parseJwtToken(jwtToken);
            String jwtUsername = jwtUtils.getUsernameFromJwtToken(parsedJwtToken);
            return userRepository.findUserByUsername(jwtUsername)
                    .orElseThrow(() -> new UsernameNotFoundException("Invalid Jwt Token"));
        } catch (Exception e){
            return null;
        }

    }
    public List<UserResponse> getAllUsers(){
        List<UserResponse> userList = new ArrayList<>();
        for(User user: userRepository.findAll()){
            userList.add(new UserResponse(user.getUsername(), user.getFullName(), user.getLastSeenAt()));
        }

        return userList;
    }


}
