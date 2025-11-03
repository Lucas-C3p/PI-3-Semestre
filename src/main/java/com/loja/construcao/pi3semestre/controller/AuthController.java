package com.loja.construcao.pi3semestre.controller;

import com.loja.construcao.pi3semestre.model.Usuario;
import com.loja.construcao.pi3semestre.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Usuario usuario) {
        // Verifica se o CPF/CNPJ já está cadastrado
        if (usuarioRepository.findByCpfCnpj(usuario.getCpfCnpj()).isPresent()) {
            return new ResponseEntity<>("CPF/CNPJ já cadastrado!", HttpStatus.BAD_REQUEST);
        }

        // Em um projeto real, a senha seria criptografada aqui
        Usuario novoUsuario = usuarioRepository.save(usuario);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Usuario loginRequest) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByCpfCnpj(loginRequest.getCpfCnpj());

        if (usuarioOptional.isEmpty()) {
            return new ResponseEntity<>("CPF/CNPJ não encontrado.", HttpStatus.UNAUTHORIZED);
        }

        Usuario usuario = usuarioOptional.get();

        // Em um projeto real, a senha seria comparada com a criptografada
        if (!usuario.getSenha().equals(loginRequest.getSenha())) {
            return new ResponseEntity<>("Senha incorreta.", HttpStatus.UNAUTHORIZED);
        }

        // Sucesso no login
        // Retorna um objeto simples de sucesso (em um projeto real, retornaria um JWT)
        return new ResponseEntity<>("Login realizado com sucesso!", HttpStatus.OK);
    }
}
