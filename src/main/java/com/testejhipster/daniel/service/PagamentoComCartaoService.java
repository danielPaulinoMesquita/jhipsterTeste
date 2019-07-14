package com.testejhipster.daniel.service;

import com.testejhipster.daniel.domain.PagamentoComCartao;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link PagamentoComCartao}.
 */
public interface PagamentoComCartaoService {

    /**
     * Save a pagamentoComCartao.
     *
     * @param pagamentoComCartao the entity to save.
     * @return the persisted entity.
     */
    PagamentoComCartao save(PagamentoComCartao pagamentoComCartao);

    /**
     * Get all the pagamentoComCartaos.
     *
     * @return the list of entities.
     */
    List<PagamentoComCartao> findAll();


    /**
     * Get the "id" pagamentoComCartao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PagamentoComCartao> findOne(Long id);

    /**
     * Delete the "id" pagamentoComCartao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
