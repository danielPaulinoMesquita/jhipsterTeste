package com.testejhipster.daniel.service;

import com.testejhipster.daniel.domain.Estado;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Estado}.
 */
public interface EstadoService {

    /**
     * Save a estado.
     *
     * @param estado the entity to save.
     * @return the persisted entity.
     */
    Estado save(Estado estado);

    /**
     * Get all the estados.
     *
     * @return the list of entities.
     */
    List<Estado> findAll();


    /**
     * Get the "id" estado.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Estado> findOne(Long id);

    /**
     * Delete the "id" estado.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
