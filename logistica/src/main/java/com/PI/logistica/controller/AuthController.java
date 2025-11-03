package com.PI.logistica.controller;

import com.PI.logistica.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @GetMapping({"/", "/login"})
    public String loginPage() { return "login"; }

    @GetMapping("/register")
    public String registerPage() { return "register"; }

    @PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password,
                        Model model) {
        if (service.login(username, password)) {
            model.addAttribute("user", username);
            return "dashboard";
        } else {
            model.addAttribute("error", "Usuário ou senha incorretos!");
            return "login";
        }
    }

    @PostMapping("/register")
    public String register(@RequestParam String username,
                           @RequestParam String password,
                           @RequestParam(required = false) String cargo,
                           Model model) {
        if (service.register(username, password, cargo)) {
            model.addAttribute("msg", "Usuário cadastrado com sucesso!");
            return "login";
        } else {
            model.addAttribute("error", "Usuário já existe!");
            return "register";
        }
    }
}
