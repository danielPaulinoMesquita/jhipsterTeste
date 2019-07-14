package com.testejhipster.daniel.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.testejhipster.daniel.domain.dto.ClienteNewDTO;
import com.testejhipster.daniel.domain.enumeration.TipoCliente;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "email")
    private String email;

    @Column(name = "cpf_ou_cnpj")
    private String cpfOuCnpj;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoCliente tipo;

    @OneToMany(mappedBy = "cliente")
    private Set<Telefone> telefones = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "cliente")
    private Set<Endereco> enderecos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Cliente(ClienteNewDTO clienteNewDTO) {
        this.id= clienteNewDTO.getId()!=null? clienteNewDTO.getId():null;
        this.nome = clienteNewDTO.getNome();
        this.email = clienteNewDTO.getEmail();
        this.cpfOuCnpj = clienteNewDTO.getCpfOuCnpj();
        this.tipo = clienteNewDTO.getTipo();
    }

    public Cliente(){

    }

    public Cliente nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public Cliente email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpfOuCnpj() {
        return cpfOuCnpj;
    }

    public Cliente cpfOuCnpj(String cpfOuCnpj) {
        this.cpfOuCnpj = cpfOuCnpj;
        return this;
    }

    public void setCpfOuCnpj(String cpfOuCnpj) {
        this.cpfOuCnpj = cpfOuCnpj;
    }

    public TipoCliente getTipo() {
        return tipo;
    }

    public Cliente tipo(TipoCliente tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoCliente tipo) {
        this.tipo = tipo;
    }

    public Set<Telefone> getTelefones() {
        return telefones;
    }

    public Cliente telefones(Set<Telefone> telefones) {
        this.telefones = telefones;
        return this;
    }

    public Cliente addTelefone(Telefone telefone) {
        this.telefones.add(telefone);
        telefone.setCliente(this);
        return this;
    }

    public Cliente removeTelefone(Telefone telefone) {
        this.telefones.remove(telefone);
        telefone.setCliente(null);
        return this;
    }

    public void setTelefones(Set<Telefone> telefones) {
        this.telefones = telefones;
    }

    public Set<Endereco> getEnderecos() {
        return enderecos;
    }

    public Cliente enderecos(Set<Endereco> enderecos) {
        this.enderecos = enderecos;
        return this;
    }

    public Cliente addEndereco(Endereco endereco) {
        this.enderecos.add(endereco);
        endereco.setCliente(this);
        return this;
    }

    public Cliente removeEndereco(Endereco endereco) {
        this.enderecos.remove(endereco);
        endereco.setCliente(null);
        return this;
    }

    public void setEnderecos(Set<Endereco> enderecos) {
        this.enderecos = enderecos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", email='" + getEmail() + "'" +
            ", cpfOuCnpj='" + getCpfOuCnpj() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
