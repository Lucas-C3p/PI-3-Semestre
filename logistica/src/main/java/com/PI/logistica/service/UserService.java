package com.PI.logistica.service;

import com.PI.logistica.model.User;
import com.PI.logistica.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean login(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && BCrypt.checkpw(password, user.getPassword());
    }

    public boolean register(String username, String password, String cargo) {
        if (userRepository.findByUsername(username) != null) {
            return false;
        }
        String hashed = BCrypt.hashpw(password, BCrypt.gensalt());
        User user = new User(username, hashed, cargo);
        userRepository.save(user);
        return true;
    }
}
