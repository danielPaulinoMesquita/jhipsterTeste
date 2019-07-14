package com.testejhipster.daniel.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PagamentoComCartao.
 */
@Entity
@Table(name = "pagamento_com_cartao")
public class PagamentoComCartao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_de_parcelas")
    private Integer numeroDeParcelas;

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

    public Integer getNumeroDeParcelas() {
        return numeroDeParcelas;
    }

    public PagamentoComCartao numeroDeParcelas(Integer numeroDeParcelas) {
        this.numeroDeParcelas = numeroDeParcelas;
        return this;
    }

    public void setNumeroDeParcelas(Integer numeroDeParcelas) {
        this.numeroDeParcelas = numeroDeParcelas;
    }

    public Pagamento getPagamento() {
        return pagamento;
    }

    public PagamentoComCartao pagamento(Pagamento pagamento) {
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
        if (!(o instanceof PagamentoComCartao)) {
            return false;
        }
        return id != null && id.equals(((PagamentoComCartao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PagamentoComCartao{" +
            "id=" + getId() +
            ", numeroDeParcelas=" + getNumeroDeParcelas() +
            "}";
    }
}
