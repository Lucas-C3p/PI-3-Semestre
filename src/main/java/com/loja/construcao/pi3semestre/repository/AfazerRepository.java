package com.loja.construcao.pi3semestre.repository;

import com.loja.construcao.pi3semestre.model.Afazer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AfazerRepository extends MongoRepository<Afazer, String> {
}