package com.testejhipster.daniel.web.rest;

import com.testejhipster.daniel.domain.PagamentoComCartao;
import com.testejhipster.daniel.service.PagamentoComCartaoService;
import com.testejhipster.daniel.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.testejhipster.daniel.domain.PagamentoComCartao}.
 */
@RestController
@RequestMapping("/api")
public class PagamentoComCartaoResource {

    private final Logger log = LoggerFactory.getLogger(PagamentoComCartaoResource.class);

    private static final String ENTITY_NAME = "pagamentoComCartao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PagamentoComCartaoService pagamentoComCartaoService;

    public PagamentoComCartaoResource(PagamentoComCartaoService pagamentoComCartaoService) {
        this.pagamentoComCartaoService = pagamentoComCartaoService;
    }

    /**
     * {@code POST  /pagamento-com-cartaos} : Create a new pagamentoComCartao.
     *
     * @param pagamentoComCartao the pagamentoComCartao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pagamentoComCartao, or with status {@code 400 (Bad Request)} if the pagamentoComCartao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pagamento-com-cartaos")
    public ResponseEntity<PagamentoComCartao> createPagamentoComCartao(@RequestBody PagamentoComCartao pagamentoComCartao) throws URISyntaxException {
        log.debug("REST request to save PagamentoComCartao : {}", pagamentoComCartao);
        if (pagamentoComCartao.getId() != null) {
            throw new BadRequestAlertException("A new pagamentoComCartao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PagamentoComCartao result = pagamentoComCartaoService.save(pagamentoComCartao);
        return ResponseEntity.created(new URI("/api/pagamento-com-cartaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pagamento-com-cartaos} : Updates an existing pagamentoComCartao.
     *
     * @param pagamentoComCartao the pagamentoComCartao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pagamentoComCartao,
     * or with status {@code 400 (Bad Request)} if the pagamentoComCartao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pagamentoComCartao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pagamento-com-cartaos")
    public ResponseEntity<PagamentoComCartao> updatePagamentoComCartao(@RequestBody PagamentoComCartao pagamentoComCartao) throws URISyntaxException {
        log.debug("REST request to update PagamentoComCartao : {}", pagamentoComCartao);
        if (pagamentoComCartao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PagamentoComCartao result = pagamentoComCartaoService.save(pagamentoComCartao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pagamentoComCartao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pagamento-com-cartaos} : get all the pagamentoComCartaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pagamentoComCartaos in body.
     */
    @GetMapping("/pagamento-com-cartaos")
    public List<PagamentoComCartao> getAllPagamentoComCartaos() {
        log.debug("REST request to get all PagamentoComCartaos");
        return pagamentoComCartaoService.findAll();
    }

    /**
     * {@code GET  /pagamento-com-cartaos/:id} : get the "id" pagamentoComCartao.
     *
     * @param id the id of the pagamentoComCartao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pagamentoComCartao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pagamento-com-cartaos/{id}")
    public ResponseEntity<PagamentoComCartao> getPagamentoComCartao(@PathVariable Long id) {
        log.debug("REST request to get PagamentoComCartao : {}", id);
        Optional<PagamentoComCartao> pagamentoComCartao = pagamentoComCartaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pagamentoComCartao);
    }

    /**
     * {@code DELETE  /pagamento-com-cartaos/:id} : delete the "id" pagamentoComCartao.
     *
     * @param id the id of the pagamentoComCartao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pagamento-com-cartaos/{id}")
    public ResponseEntity<Void> deletePagamentoComCartao(@PathVariable Long id) {
        log.debug("REST request to delete PagamentoComCartao : {}", id);
        pagamentoComCartaoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
