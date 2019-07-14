package com.testejhipster.daniel.web.rest;

import com.testejhipster.daniel.TestehipsterApp;
import com.testejhipster.daniel.domain.ItemPedido;
import com.testejhipster.daniel.repository.ItemPedidoRepository;
import com.testejhipster.daniel.service.ItemPedidoService;
import com.testejhipster.daniel.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.testejhipster.daniel.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ItemPedidoResource} REST controller.
 */
@SpringBootTest(classes = TestehipsterApp.class)
public class ItemPedidoResourceIT {

    private static final Double DEFAULT_DESCONTO = 1D;
    private static final Double UPDATED_DESCONTO = 2D;

    private static final Integer DEFAULT_QUANTIDADE = 1;
    private static final Integer UPDATED_QUANTIDADE = 2;

    private static final Double DEFAULT_PRECO = 1D;
    private static final Double UPDATED_PRECO = 2D;

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private ItemPedidoService itemPedidoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restItemPedidoMockMvc;

    private ItemPedido itemPedido;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemPedidoResource itemPedidoResource = new ItemPedidoResource(itemPedidoService);
        this.restItemPedidoMockMvc = MockMvcBuilders.standaloneSetup(itemPedidoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPedido createEntity(EntityManager em) {
        ItemPedido itemPedido = new ItemPedido()
            .desconto(DEFAULT_DESCONTO)
            .quantidade(DEFAULT_QUANTIDADE)
            .preco(DEFAULT_PRECO);
        return itemPedido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPedido createUpdatedEntity(EntityManager em) {
        ItemPedido itemPedido = new ItemPedido()
            .desconto(UPDATED_DESCONTO)
            .quantidade(UPDATED_QUANTIDADE)
            .preco(UPDATED_PRECO);
        return itemPedido;
    }

    @BeforeEach
    public void initTest() {
        itemPedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemPedido() throws Exception {
        int databaseSizeBeforeCreate = itemPedidoRepository.findAll().size();

        // Create the ItemPedido
        restItemPedidoMockMvc.perform(post("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemPedido)))
            .andExpect(status().isCreated());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        ItemPedido testItemPedido = itemPedidoList.get(itemPedidoList.size() - 1);
        assertThat(testItemPedido.getDesconto()).isEqualTo(DEFAULT_DESCONTO);
        assertThat(testItemPedido.getQuantidade()).isEqualTo(DEFAULT_QUANTIDADE);
        assertThat(testItemPedido.getPreco()).isEqualTo(DEFAULT_PRECO);
    }

    @Test
    @Transactional
    public void createItemPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemPedidoRepository.findAll().size();

        // Create the ItemPedido with an existing ID
        itemPedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemPedidoMockMvc.perform(post("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemPedido)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllItemPedidos() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        // Get all the itemPedidoList
        restItemPedidoMockMvc.perform(get("/api/item-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemPedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].desconto").value(hasItem(DEFAULT_DESCONTO.doubleValue())))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE)))
            .andExpect(jsonPath("$.[*].preco").value(hasItem(DEFAULT_PRECO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getItemPedido() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        // Get the itemPedido
        restItemPedidoMockMvc.perform(get("/api/item-pedidos/{id}", itemPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemPedido.getId().intValue()))
            .andExpect(jsonPath("$.desconto").value(DEFAULT_DESCONTO.doubleValue()))
            .andExpect(jsonPath("$.quantidade").value(DEFAULT_QUANTIDADE))
            .andExpect(jsonPath("$.preco").value(DEFAULT_PRECO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingItemPedido() throws Exception {
        // Get the itemPedido
        restItemPedidoMockMvc.perform(get("/api/item-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemPedido() throws Exception {
        // Initialize the database
        itemPedidoService.save(itemPedido);

        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();

        // Update the itemPedido
        ItemPedido updatedItemPedido = itemPedidoRepository.findById(itemPedido.getId()).get();
        // Disconnect from session so that the updates on updatedItemPedido are not directly saved in db
        em.detach(updatedItemPedido);
        updatedItemPedido
            .desconto(UPDATED_DESCONTO)
            .quantidade(UPDATED_QUANTIDADE)
            .preco(UPDATED_PRECO);

        restItemPedidoMockMvc.perform(put("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemPedido)))
            .andExpect(status().isOk());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
        ItemPedido testItemPedido = itemPedidoList.get(itemPedidoList.size() - 1);
        assertThat(testItemPedido.getDesconto()).isEqualTo(UPDATED_DESCONTO);
        assertThat(testItemPedido.getQuantidade()).isEqualTo(UPDATED_QUANTIDADE);
        assertThat(testItemPedido.getPreco()).isEqualTo(UPDATED_PRECO);
    }

    @Test
    @Transactional
    public void updateNonExistingItemPedido() throws Exception {
        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();

        // Create the ItemPedido

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc.perform(put("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemPedido)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemPedido() throws Exception {
        // Initialize the database
        itemPedidoService.save(itemPedido);

        int databaseSizeBeforeDelete = itemPedidoRepository.findAll().size();

        // Delete the itemPedido
        restItemPedidoMockMvc.perform(delete("/api/item-pedidos/{id}", itemPedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemPedido.class);
        ItemPedido itemPedido1 = new ItemPedido();
        itemPedido1.setId(1L);
        ItemPedido itemPedido2 = new ItemPedido();
        itemPedido2.setId(itemPedido1.getId());
        assertThat(itemPedido1).isEqualTo(itemPedido2);
        itemPedido2.setId(2L);
        assertThat(itemPedido1).isNotEqualTo(itemPedido2);
        itemPedido1.setId(null);
        assertThat(itemPedido1).isNotEqualTo(itemPedido2);
    }
}
