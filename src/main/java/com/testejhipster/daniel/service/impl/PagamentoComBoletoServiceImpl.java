package com.testejhipster.daniel.service.impl;

import com.testejhipster.daniel.service.PagamentoComBoletoService;
import com.testejhipster.daniel.domain.PagamentoComBoleto;
import com.testejhipster.daniel.repository.PagamentoComBoletoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link PagamentoComBoleto}.
 */
@Service
@Transactional
public class PagamentoComBoletoServiceImpl implements PagamentoComBoletoService {

    private final Logger log = LoggerFactory.getLogger(PagamentoComBoletoServiceImpl.class);

    private final PagamentoComBoletoRepository pagamentoComBoletoRepository;

    public PagamentoComBoletoServiceImpl(PagamentoComBoletoRepository pagamentoComBoletoRepository) {
        this.pagamentoComBoletoRepository = pagamentoComBoletoRepository;
    }

    /**
     * Save a pagamentoComBoleto.
     *
     * @param pagamentoComBoleto the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PagamentoComBoleto save(PagamentoComBoleto pagamentoComBoleto) {
        log.debug("Request to save PagamentoComBoleto : {}", pagamentoComBoleto);
        return pagamentoComBoletoRepository.save(pagamentoComBoleto);
    }

    /**
     * Get all the pagamentoComBoletos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PagamentoComBoleto> findAll() {
        log.debug("Request to get all PagamentoComBoletos");
        return pagamentoComBoletoRepository.findAll();
    }


    /**
     * Get one pagamentoComBoleto by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PagamentoComBoleto> findOne(Long id) {
        log.debug("Request to get PagamentoComBoleto : {}", id);
        return pagamentoComBoletoRepository.findById(id);
    }

    /**
     * Delete the pagamentoComBoleto by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PagamentoComBoleto : {}", id);
        pagamentoComBoletoRepository.deleteById(id);
    }
}
