package com.loja.construcao.pi3semestre.controller;

import com.loja.construcao.pi3semestre.model.Produto;
import com.loja.construcao.pi3semestre.repository.ProdutoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoRepository repo;

    public ProdutoController(ProdutoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listar() {
        List<Produto> todos = repo.findAll();
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody Produto p) {
        Produto salvo = repo.save(p);
        return ResponseEntity.ok(salvo);
    }
}