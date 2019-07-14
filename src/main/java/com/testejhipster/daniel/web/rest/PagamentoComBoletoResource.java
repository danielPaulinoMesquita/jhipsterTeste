package com.testejhipster.daniel.web.rest;

import com.testejhipster.daniel.domain.PagamentoComBoleto;
import com.testejhipster.daniel.service.PagamentoComBoletoService;
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
 * REST controller for managing {@link com.testejhipster.daniel.domain.PagamentoComBoleto}.
 */
@RestController
@RequestMapping("/api")
public class PagamentoComBoletoResource {

    private final Logger log = LoggerFactory.getLogger(PagamentoComBoletoResource.class);

    private static final String ENTITY_NAME = "pagamentoComBoleto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PagamentoComBoletoService pagamentoComBoletoService;

    public PagamentoComBoletoResource(PagamentoComBoletoService pagamentoComBoletoService) {
        this.pagamentoComBoletoService = pagamentoComBoletoService;
    }

    /**
     * {@code POST  /pagamento-com-boletos} : Create a new pagamentoComBoleto.
     *
     * @param pagamentoComBoleto the pagamentoComBoleto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pagamentoComBoleto, or with status {@code 400 (Bad Request)} if the pagamentoComBoleto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pagamento-com-boletos")
    public ResponseEntity<PagamentoComBoleto> createPagamentoComBoleto(@RequestBody PagamentoComBoleto pagamentoComBoleto) throws URISyntaxException {
        log.debug("REST request to save PagamentoComBoleto : {}", pagamentoComBoleto);
        if (pagamentoComBoleto.getId() != null) {
            throw new BadRequestAlertException("A new pagamentoComBoleto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PagamentoComBoleto result = pagamentoComBoletoService.save(pagamentoComBoleto);
        return ResponseEntity.created(new URI("/api/pagamento-com-boletos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pagamento-com-boletos} : Updates an existing pagamentoComBoleto.
     *
     * @param pagamentoComBoleto the pagamentoComBoleto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pagamentoComBoleto,
     * or with status {@code 400 (Bad Request)} if the pagamentoComBoleto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pagamentoComBoleto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pagamento-com-boletos")
    public ResponseEntity<PagamentoComBoleto> updatePagamentoComBoleto(@RequestBody PagamentoComBoleto pagamentoComBoleto) throws URISyntaxException {
        log.debug("REST request to update PagamentoComBoleto : {}", pagamentoComBoleto);
        if (pagamentoComBoleto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PagamentoComBoleto result = pagamentoComBoletoService.save(pagamentoComBoleto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pagamentoComBoleto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pagamento-com-boletos} : get all the pagamentoComBoletos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pagamentoComBoletos in body.
     */
    @GetMapping("/pagamento-com-boletos")
    public List<PagamentoComBoleto> getAllPagamentoComBoletos() {
        log.debug("REST request to get all PagamentoComBoletos");
        return pagamentoComBoletoService.findAll();
    }

    /**
     * {@code GET  /pagamento-com-boletos/:id} : get the "id" pagamentoComBoleto.
     *
     * @param id the id of the pagamentoComBoleto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pagamentoComBoleto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pagamento-com-boletos/{id}")
    public ResponseEntity<PagamentoComBoleto> getPagamentoComBoleto(@PathVariable Long id) {
        log.debug("REST request to get PagamentoComBoleto : {}", id);
        Optional<PagamentoComBoleto> pagamentoComBoleto = pagamentoComBoletoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pagamentoComBoleto);
    }

    /**
     * {@code DELETE  /pagamento-com-boletos/:id} : delete the "id" pagamentoComBoleto.
     *
     * @param id the id of the pagamentoComBoleto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pagamento-com-boletos/{id}")
    public ResponseEntity<Void> deletePagamentoComBoleto(@PathVariable Long id) {
        log.debug("REST request to delete PagamentoComBoleto : {}", id);
        pagamentoComBoletoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
