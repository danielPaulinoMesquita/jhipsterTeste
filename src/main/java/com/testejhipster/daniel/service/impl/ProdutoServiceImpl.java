package com.testejhipster.daniel.service.impl;

import com.testejhipster.daniel.service.ProdutoService;
import com.testejhipster.daniel.domain.Produto;
import com.testejhipster.daniel.repository.ProdutoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Produto}.
 */
@Service
@Transactional
public class ProdutoServiceImpl implements ProdutoService {

    private final Logger log = LoggerFactory.getLogger(ProdutoServiceImpl.class);

    private final ProdutoRepository produtoRepository;

    public ProdutoServiceImpl(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    /**
     * Save a produto.
     *
     * @param produto the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Produto save(Produto produto) {
        log.debug("Request to save Produto : {}", produto);
        return produtoRepository.save(produto);
    }

    /**
     * Get all the produtos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Produto> findAll() {
        log.debug("Request to get all Produtos");
        return produtoRepository.findAll();
    }


    /**
     * Get one produto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Produto> findOne(Long id) {
        log.debug("Request to get Produto : {}", id);
        return produtoRepository.findById(id);
    }

    /**
     * Delete the produto by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Produto : {}", id);
        produtoRepository.deleteById(id);
    }
}
