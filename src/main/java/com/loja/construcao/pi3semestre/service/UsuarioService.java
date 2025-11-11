package com.loja.construcao.pi3semestre.service;

import com.loja.construcao.pi3semestre.model.Usuario;
import com.loja.construcao.pi3semestre.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario registerUser(Usuario usuario) throws Exception {
        // Verifica se o CPF/CNPJ já está cadastrado
        if (usuarioRepository.findByCpfCnpj(usuario.getCpfCnpj()).isPresent()) {
            throw new Exception("CPF/CNPJ já cadastrado!");
        }

        // Em um projeto real, a senha seria criptografada aqui
        return usuarioRepository.save(usuario);
    }

    public Usuario authenticateUser(Usuario loginRequest) throws Exception {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByCpfCnpj(loginRequest.getCpfCnpj());

        if (usuarioOptional.isEmpty()) {
            throw new Exception("CPF/CNPJ não encontrado.");
        }

        Usuario usuario = usuarioOptional.get();

        // Em um projeto real, a senha seria comparada com a criptografada
        if (!usuario.getSenha().equals(loginRequest.getSenha())) {
            throw new Exception("Senha incorreta.");
        }

        // Sucesso no login
        return usuario;
    }
}
