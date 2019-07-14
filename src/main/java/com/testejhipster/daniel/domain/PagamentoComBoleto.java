package com.testejhipster.daniel.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Date;

/**
 * A PagamentoComBoleto.
 */
@Entity
@Table(name = "pagamento_com_boleto")
public class PagamentoComBoleto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_vencimento")
    private Date dataVencimento;

    @Column(name = "data_pagamento")
    private Date dataPagamento;

    @OneToOne
    @JoinColumn(unique = true)
    private Pagamento pagamento;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDataVencimento() {
        return dataVencimento;
    }

    public PagamentoComBoleto dataVencimento(Date dataVencimento) {
        this.dataVencimento = dataVencimento;
        return this;
    }

    public void setDataVencimento(Date dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public Date getDataPagamento() {
        return dataPagamento;
    }

    public PagamentoComBoleto dataPagamento(Date dataPagamento) {
        this.dataPagamento = dataPagamento;
        return this;
    }

    public void setDataPagamento(Date dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public Pagamento getPagamento() {
        return pagamento;
    }

    public PagamentoComBoleto pagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
        return this;
    }

    public void setPagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PagamentoComBoleto)) {
            return false;
        }
        return id != null && id.equals(((PagamentoComBoleto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PagamentoComBoleto{" +
            "id=" + getId() +
            ", dataVencimento='" + getDataVencimento() + "'" +
            ", dataPagamento='" + getDataPagamento() + "'" +
            "}";
    }
}
