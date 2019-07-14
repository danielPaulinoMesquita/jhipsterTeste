package com.testejhipster.daniel.service.impl;

import com.testejhipster.daniel.domain.*;
import com.testejhipster.daniel.domain.dto.ClienteNewDTO;
import com.testejhipster.daniel.repository.CidadeRepository;
import com.testejhipster.daniel.repository.ClienteRepository;
import com.testejhipster.daniel.repository.EnderecoRepository;
import com.testejhipster.daniel.repository.EstadoRepository;
import com.testejhipster.daniel.service.ClienteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Cliente}.
 */
@Service
@Transactional
public class ClienteServiceImpl implements ClienteService {

    private final Logger log = LoggerFactory.getLogger(ClienteServiceImpl.class);

    private final ClienteRepository clienteRepository;

    @Autowired
    private  EnderecoRepository enderecoRepository;

    @Autowired
    private CidadeRepository cidadeRepository;

    @Autowired
    private EstadoRepository estadoRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    /**
     * Save a cliente.
     *
     * @param cliente the entity to save.
     * @return the persisted entity.
     */
    @Override
    @Transactional
    public Cliente save(Cliente cliente) {
        log.debug("Request to save Cliente : {}", cliente);
        cliente= clienteRepository.save(cliente);
        estadoRepository.saveAndFlush(cliente.getEnderecos().iterator().next().getCidade().getEstado());
        cidadeRepository.saveAndFlush(cliente.getEnderecos().iterator().next().getCidade());
        enderecoRepository.saveAll(cliente.getEnderecos());
        return cliente;
    }

    /**
     * Get all the clientes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Cliente> findAll(Pageable pageable) {
        log.debug("Request to get all Clientes");
        return clienteRepository.findAll(pageable);
    }


    /**
     * Get one cliente by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Cliente> findOne(Long id) {
        log.debug("Request to get Cliente : {}", id);
        return clienteRepository.findById(id);
    }

    /**
     * Delete the cliente by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cliente : {}", id);
        clienteRepository.deleteById(id);
    }


    public static Cliente parseDto(ClienteNewDTO clienteNewDTO) {

        //Criando estado- E1
        Estado e1 = new Estado();
        e1.setId(null);
        e1.setNome(clienteNewDTO.getEstadoNome());

        //Criando cidade- C1
        Cidade c1 = new Cidade();
        c1.setId(null);
        c1.setNome(clienteNewDTO.getCidadeNome());
        c1.setEstado(e1);

        e1.getCidades().add(c1);

        //Criando endereço- ENDEREÇO
        Endereco endereco = new Endereco();
        endereco.setId(null);
        endereco.setBairro(clienteNewDTO.getBairro());
        endereco.setLogradouro(clienteNewDTO.getLogradouro());
        endereco.setNumero(clienteNewDTO.getNumero());
        endereco.setComplemento(clienteNewDTO.getComplemento());
        endereco.setCep(clienteNewDTO.getCep());
        endereco.setCidade(c1);

        //Criando cliente- CLIENTE
        Cliente cliente = new Cliente(clienteNewDTO);

        //Criando telefone
        Telefone t1= new Telefone();
        t1.setNumero(clienteNewDTO.getTelefones());
        t1.setCliente(cliente);

        cliente.getTelefones().add(t1);
        endereco.setCliente(cliente);

        cliente.getEnderecos().add(endereco);


        return cliente;

    }
}
