package com.loja.construcao.pi3semestre.controller;

import com.loja.construcao.pi3semestre.model.Usuario;
<<<<<<< HEAD
import com.loja.construcao.pi3semestre.service.AuthService;
=======
import com.loja.construcao.pi3semestre.repository.UsuarioRepository;
>>>>>>> 8f95cd31c8a286864b0f48cfc70af8adac57920a
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

<<<<<<< HEAD
=======
import java.util.Optional;

>>>>>>> 8f95cd31c8a286864b0f48cfc70af8adac57920a
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
<<<<<<< HEAD
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Usuario usuario) {
        try {
            Usuario novoUsuario = authService.registerUser(usuario);
            return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
=======
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
>>>>>>> 8f95cd31c8a286864b0f48cfc70af8adac57920a
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Usuario loginRequest) {
<<<<<<< HEAD
        try {
            Usuario usuario = authService.authenticateUser(loginRequest);
            // Retorna um objeto simples de sucesso (em um projeto real, retornaria um JWT)
            return new ResponseEntity<>("Login realizado com sucesso!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
=======
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
>>>>>>> 8f95cd31c8a286864b0f48cfc70af8adac57920a
    }
}
