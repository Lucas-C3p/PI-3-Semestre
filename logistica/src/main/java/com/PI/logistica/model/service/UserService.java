package com.PI.logistica.model.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.PI.logistica.model.User;
import com.PI.logistica.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean login(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }

    public boolean register(String username, String password, String cargo) {
        if (userRepository.findByUsername(username) != null) {
            return false; // usuário já existe
        }
        User newUser = new User(username, password, cargo);
        userRepository.save(newUser);
        return true;
    }
}
