package com.loja.construcao.pi3semestre.controller;

import com.loja.construcao.pi3semestre.model.Afazer;
import com.loja.construcao.pi3semestre.repository.AfazerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/afazeres")
@CrossOrigin(origins = "*")
public class AfazerController {

    private final AfazerRepository repo;

    public AfazerController(AfazerRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public ResponseEntity<List<Afazer>> listar() {
        List<Afazer> todos = repo.findAll();
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    public ResponseEntity<Afazer> criar(@RequestBody Afazer a) {
        Afazer salvo = repo.save(a);
        return ResponseEntity.ok(salvo);
    }
}