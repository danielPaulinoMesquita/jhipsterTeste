package com.testejhipster.daniel.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * A Pedido.
 */
@Entity
@Table(name = "pedido")
public class Pedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "instante")
    private Date instante;

    @OneToOne
    @JoinColumn(unique = true)
    private Pagamento pagamento;

    @ManyToOne
    @JsonIgnoreProperties("pedidos")
    private Cliente cliente;

    @ManyToMany
    @JoinTable(name = "pedido_produto",
               joinColumns = @JoinColumn(name = "pedido_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "produto_id", referencedColumnName = "id"))
    private Set<Produto> produtos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getInstante() {
        return instante;
    }

    public Pedido instante(Date instante) {
        this.instante = instante;
        return this;
    }

    public void setInstante(Date instante) {
        this.instante = instante;
    }

    public Pagamento getPagamento() {
        return pagamento;
    }

    public Pedido pagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
        return this;
    }

    public void setPagamento(Pagamento pagamento) {
        this.pagamento = pagamento;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Pedido cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Set<Produto> getProdutos() {
        return produtos;
    }

    public Pedido produtos(Set<Produto> produtos) {
        this.produtos = produtos;
        return this;
    }

    public Pedido addProduto(Produto produto) {
        this.produtos.add(produto);
        produto.getPedidos().add(this);
        return this;
    }

    public Pedido removeProduto(Produto produto) {
        this.produtos.remove(produto);
        produto.getPedidos().remove(this);
        return this;
    }

    public void setProdutos(Set<Produto> produtos) {
        this.produtos = produtos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pedido)) {
            return false;
        }
        return id != null && id.equals(((Pedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Pedido{" +
            "id=" + getId() +
            ", instante='" + getInstante() + "'" +
            "}";
    }
}
