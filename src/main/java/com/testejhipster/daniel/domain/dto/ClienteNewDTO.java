package com.testejhipster.daniel.domain.dto;

import com.testejhipster.daniel.domain.Telefone;
import com.testejhipster.daniel.domain.enumeration.TipoCliente;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.HashSet;
import java.util.Set;

public class ClienteDTO {

    private String nome;

    private String email;

    private String cpfOuCnpj;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoCliente tipo;

    private Set<Telefone> telefones = new HashSet<>();

    //Endereço
    private String logradouro;

    private String numero;

    private String complemento;

    private String bairro;

    private String cep;
}
