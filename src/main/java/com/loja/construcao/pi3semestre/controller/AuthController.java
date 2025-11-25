package com.loja.construcao.pi3semestre.controller;

import com.loja.construcao.pi3semestre.model.Usuario;
import com.loja.construcao.pi3semestre.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthController(UsuarioRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/usuarios")
    public ResponseEntity<?> registrar(@RequestBody Usuario u) {
        if (u.getUsername() == null || u.getUsername().isEmpty() || u.getSenha() == null || u.getSenha().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("erro", "username e senha são obrigatórios"));
        }
        if (repo.existsByUsername(u.getUsername())) {
            return ResponseEntity.status(409).body(Map.of("erro", "username já existe"));
        }
        String hash = encoder.encode(u.getSenha());
        u.setSenha(hash);
        Usuario salvo = repo.save(u);
        // não retornar o hash no body
        Map<String,Object> resp = new HashMap<>();
        resp.put("id", salvo.getId());
        resp.put("username", salvo.getUsername());
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Usuario u) {
        if (u.getUsername() == null || u.getSenha() == null) {
            return ResponseEntity.badRequest().body(Map.of("erro", "username e senha são obrigatórios"));
        }
        Optional<Usuario> opt = repo.findByUsername(u.getUsername());
        if (opt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("erro", "credenciais inválidas"));
        }
        Usuario encontrado = opt.get();
        if (!encoder.matches(u.getSenha(), encontrado.getSenha())) {
            return ResponseEntity.status(401).body(Map.of("erro", "credenciais inválidas"));
        }
        // retorno simples: sucesso
        Map<String,Object> resp = new HashMap<>();
        resp.put("id", encontrado.getId());
        resp.put("username", encontrado.getUsername());
        resp.put("message", "login successful");
        return ResponseEntity.ok(resp);
    }
}