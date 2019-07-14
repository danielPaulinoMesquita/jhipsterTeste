package com.testejhipster.daniel.service.impl;

import com.testejhipster.daniel.service.ItemPedidoService;
import com.testejhipster.daniel.domain.ItemPedido;
import com.testejhipster.daniel.repository.ItemPedidoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link ItemPedido}.
 */
@Service
@Transactional
public class ItemPedidoServiceImpl implements ItemPedidoService {

    private final Logger log = LoggerFactory.getLogger(ItemPedidoServiceImpl.class);

    private final ItemPedidoRepository itemPedidoRepository;

    public ItemPedidoServiceImpl(ItemPedidoRepository itemPedidoRepository) {
        this.itemPedidoRepository = itemPedidoRepository;
    }

    /**
     * Save a itemPedido.
     *
     * @param itemPedido the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ItemPedido save(ItemPedido itemPedido) {
        log.debug("Request to save ItemPedido : {}", itemPedido);
        return itemPedidoRepository.save(itemPedido);
    }

    /**
     * Get all the itemPedidos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ItemPedido> findAll() {
        log.debug("Request to get all ItemPedidos");
        return itemPedidoRepository.findAll();
    }


    /**
     * Get one itemPedido by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ItemPedido> findOne(Long id) {
        log.debug("Request to get ItemPedido : {}", id);
        return itemPedidoRepository.findById(id);
    }

    /**
     * Delete the itemPedido by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ItemPedido : {}", id);
        itemPedidoRepository.deleteById(id);
    }
}
