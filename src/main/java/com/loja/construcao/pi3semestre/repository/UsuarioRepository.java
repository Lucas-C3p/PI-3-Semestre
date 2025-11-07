package com.loja.construcao.pi3semestre.repository;

import com.loja.construcao.pi3semestre.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByCpfCnpj(String cpfCnpj);
}
