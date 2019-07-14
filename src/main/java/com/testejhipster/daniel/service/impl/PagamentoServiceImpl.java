package com.testejhipster.daniel.service.impl;

import com.testejhipster.daniel.service.PagamentoService;
import com.testejhipster.daniel.domain.Pagamento;
import com.testejhipster.daniel.repository.PagamentoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Pagamento}.
 */
@Service
@Transactional
public class PagamentoServiceImpl implements PagamentoService {

    private final Logger log = LoggerFactory.getLogger(PagamentoServiceImpl.class);

    private final PagamentoRepository pagamentoRepository;

    public PagamentoServiceImpl(PagamentoRepository pagamentoRepository) {
        this.pagamentoRepository = pagamentoRepository;
    }

    /**
     * Save a pagamento.
     *
     * @param pagamento the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Pagamento save(Pagamento pagamento) {
        log.debug("Request to save Pagamento : {}", pagamento);
        return pagamentoRepository.save(pagamento);
    }

    /**
     * Get all the pagamentos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Pagamento> findAll() {
        log.debug("Request to get all Pagamentos");
        return pagamentoRepository.findAll();
    }


    /**
     * Get one pagamento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Pagamento> findOne(Long id) {
        log.debug("Request to get Pagamento : {}", id);
        return pagamentoRepository.findById(id);
    }

    /**
     * Delete the pagamento by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pagamento : {}", id);
        pagamentoRepository.deleteById(id);
    }
}
