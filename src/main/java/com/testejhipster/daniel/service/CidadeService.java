package com.testejhipster.daniel.service;

import com.testejhipster.daniel.domain.Cidade;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Cidade}.
 */
public interface CidadeService {

    /**
     * Save a cidade.
     *
     * @param cidade the entity to save.
     * @return the persisted entity.
     */
    Cidade save(Cidade cidade);

    /**
     * Get all the cidades.
     *
     * @return the list of entities.
     */
    List<Cidade> findAll();


    /**
     * Get the "id" cidade.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Cidade> findOne(Long id);

    /**
     * Delete the "id" cidade.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
