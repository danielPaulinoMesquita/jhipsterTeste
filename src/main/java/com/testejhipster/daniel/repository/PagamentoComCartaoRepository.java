package com.testejhipster.daniel.repository;

import com.testejhipster.daniel.domain.PagamentoComCartao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PagamentoComCartao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagamentoComCartaoRepository extends JpaRepository<PagamentoComCartao, Long> {

}
