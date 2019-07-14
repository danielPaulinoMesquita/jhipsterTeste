package com.testejhipster.daniel.service.impl;

import com.testejhipster.daniel.service.PagamentoComCartaoService;
import com.testejhipster.daniel.domain.PagamentoComCartao;
import com.testejhipster.daniel.repository.PagamentoComCartaoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link PagamentoComCartao}.
 */
@Service
@Transactional
public class PagamentoComCartaoServiceImpl implements PagamentoComCartaoService {

    private final Logger log = LoggerFactory.getLogger(PagamentoComCartaoServiceImpl.class);

    private final PagamentoComCartaoRepository pagamentoComCartaoRepository;

    public PagamentoComCartaoServiceImpl(PagamentoComCartaoRepository pagamentoComCartaoRepository) {
        this.pagamentoComCartaoRepository = pagamentoComCartaoRepository;
    }

    /**
     * Save a pagamentoComCartao.
     *
     * @param pagamentoComCartao the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PagamentoComCartao save(PagamentoComCartao pagamentoComCartao) {
        log.debug("Request to save PagamentoComCartao : {}", pagamentoComCartao);
        return pagamentoComCartaoRepository.save(pagamentoComCartao);
    }

    /**
     * Get all the pagamentoComCartaos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PagamentoComCartao> findAll() {
        log.debug("Request to get all PagamentoComCartaos");
        return pagamentoComCartaoRepository.findAll();
    }


    /**
     * Get one pagamentoComCartao by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PagamentoComCartao> findOne(Long id) {
        log.debug("Request to get PagamentoComCartao : {}", id);
        return pagamentoComCartaoRepository.findById(id);
    }

    /**
     * Delete the pagamentoComCartao by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PagamentoComCartao : {}", id);
        pagamentoComCartaoRepository.deleteById(id);
    }
}
