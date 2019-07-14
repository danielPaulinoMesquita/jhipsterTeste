package com.testejhipster.daniel.service;

import com.testejhipster.daniel.domain.Categoria;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Categoria}.
 */
public interface CategoriaService {

    /**
     * Save a categoria.
     *
     * @param categoria the entity to save.
     * @return the persisted entity.
     */
    Categoria save(Categoria categoria);

    /**
     * Get all the categorias.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Categoria> findAll(Pageable pageable);

    /**
     * Get all the categorias with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Categoria> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" categoria.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Categoria> findOne(Long id);

    /**
     * Delete the "id" categoria.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
