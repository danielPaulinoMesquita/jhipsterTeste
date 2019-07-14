package com.testejhipster.daniel.domain;

import javax.persistence.*;

import java.io.Serializable;

import com.testejhipster.daniel.domain.enumeration.EstadoPagamento;

/**
 * A Pagamento.
 */
@Entity
@Table(name = "pagamento")
public class Pagamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoPagamento estado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EstadoPagamento getEstado() {
        return estado;
    }

    public Pagamento estado(EstadoPagamento estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(EstadoPagamento estado) {
        this.estado = estado;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pagamento)) {
            return false;
        }
        return id != null && id.equals(((Pagamento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Pagamento{" +
            "id=" + getId() +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
