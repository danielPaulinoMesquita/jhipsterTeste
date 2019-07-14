package com.testejhipster.daniel.repository;

import com.testejhipster.daniel.domain.Cliente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


/**
 * Spring Data  repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Transactional
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
