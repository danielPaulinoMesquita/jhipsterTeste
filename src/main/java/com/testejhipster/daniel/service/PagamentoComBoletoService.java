package com.testejhipster.daniel.service;

import com.testejhipster.daniel.domain.PagamentoComBoleto;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link PagamentoComBoleto}.
 */
public interface PagamentoComBoletoService {

    /**
     * Save a pagamentoComBoleto.
     *
     * @param pagamentoComBoleto the entity to save.
     * @return the persisted entity.
     */
    PagamentoComBoleto save(PagamentoComBoleto pagamentoComBoleto);

    /**
     * Get all the pagamentoComBoletos.
     *
     * @return the list of entities.
     */
    List<PagamentoComBoleto> findAll();


    /**
     * Get the "id" pagamentoComBoleto.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PagamentoComBoleto> findOne(Long id);

    /**
     * Delete the "id" pagamentoComBoleto.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
