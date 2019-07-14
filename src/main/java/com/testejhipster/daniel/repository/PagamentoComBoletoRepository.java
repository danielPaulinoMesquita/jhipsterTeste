package com.testejhipster.daniel.repository;

import com.testejhipster.daniel.domain.PagamentoComBoleto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PagamentoComBoleto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagamentoComBoletoRepository extends JpaRepository<PagamentoComBoleto, Long> {

}
