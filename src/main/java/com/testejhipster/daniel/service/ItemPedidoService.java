package com.testejhipster.daniel.service;

import com.testejhipster.daniel.domain.ItemPedido;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ItemPedido}.
 */
public interface ItemPedidoService {

    /**
     * Save a itemPedido.
     *
     * @param itemPedido the entity to save.
     * @return the persisted entity.
     */
    ItemPedido save(ItemPedido itemPedido);

    /**
     * Get all the itemPedidos.
     *
     * @return the list of entities.
     */
    List<ItemPedido> findAll();


    /**
     * Get the "id" itemPedido.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ItemPedido> findOne(Long id);

    /**
     * Delete the "id" itemPedido.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
