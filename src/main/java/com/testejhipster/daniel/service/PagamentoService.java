package com.testejhipster.daniel.service;

import com.testejhipster.daniel.domain.Pagamento;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Pagamento}.
 */
public interface PagamentoService {

    /**
     * Save a pagamento.
     *
     * @param pagamento the entity to save.
     * @return the persisted entity.
     */
    Pagamento save(Pagamento pagamento);

    /**
     * Get all the pagamentos.
     *
     * @return the list of entities.
     */
    List<Pagamento> findAll();


    /**
     * Get the "id" pagamento.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Pagamento> findOne(Long id);

    /**
     * Delete the "id" pagamento.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
