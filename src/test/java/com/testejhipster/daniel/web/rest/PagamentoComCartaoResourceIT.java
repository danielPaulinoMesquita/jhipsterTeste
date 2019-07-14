package com.testejhipster.daniel.web.rest;

import com.testejhipster.daniel.TestehipsterApp;
import com.testejhipster.daniel.domain.PagamentoComCartao;
import com.testejhipster.daniel.repository.PagamentoComCartaoRepository;
import com.testejhipster.daniel.service.PagamentoComCartaoService;
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
 * Integration tests for the {@Link PagamentoComCartaoResource} REST controller.
 */
@SpringBootTest(classes = TestehipsterApp.class)
public class PagamentoComCartaoResourceIT {

    private static final Integer DEFAULT_NUMERO_DE_PARCELAS = 1;
    private static final Integer UPDATED_NUMERO_DE_PARCELAS = 2;

    @Autowired
    private PagamentoComCartaoRepository pagamentoComCartaoRepository;

    @Autowired
    private PagamentoComCartaoService pagamentoComCartaoService;

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

    private MockMvc restPagamentoComCartaoMockMvc;

    private PagamentoComCartao pagamentoComCartao;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PagamentoComCartaoResource pagamentoComCartaoResource = new PagamentoComCartaoResource(pagamentoComCartaoService);
        this.restPagamentoComCartaoMockMvc = MockMvcBuilders.standaloneSetup(pagamentoComCartaoResource)
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
    public static PagamentoComCartao createEntity(EntityManager em) {
        PagamentoComCartao pagamentoComCartao = new PagamentoComCartao()
            .numeroDeParcelas(DEFAULT_NUMERO_DE_PARCELAS);
        return pagamentoComCartao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PagamentoComCartao createUpdatedEntity(EntityManager em) {
        PagamentoComCartao pagamentoComCartao = new PagamentoComCartao()
            .numeroDeParcelas(UPDATED_NUMERO_DE_PARCELAS);
        return pagamentoComCartao;
    }

    @BeforeEach
    public void initTest() {
        pagamentoComCartao = createEntity(em);
    }

    @Test
    @Transactional
    public void createPagamentoComCartao() throws Exception {
        int databaseSizeBeforeCreate = pagamentoComCartaoRepository.findAll().size();

        // Create the PagamentoComCartao
        restPagamentoComCartaoMockMvc.perform(post("/api/pagamento-com-cartaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagamentoComCartao)))
            .andExpect(status().isCreated());

        // Validate the PagamentoComCartao in the database
        List<PagamentoComCartao> pagamentoComCartaoList = pagamentoComCartaoRepository.findAll();
        assertThat(pagamentoComCartaoList).hasSize(databaseSizeBeforeCreate + 1);
        PagamentoComCartao testPagamentoComCartao = pagamentoComCartaoList.get(pagamentoComCartaoList.size() - 1);
        assertThat(testPagamentoComCartao.getNumeroDeParcelas()).isEqualTo(DEFAULT_NUMERO_DE_PARCELAS);
    }

    @Test
    @Transactional
    public void createPagamentoComCartaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pagamentoComCartaoRepository.findAll().size();

        // Create the PagamentoComCartao with an existing ID
        pagamentoComCartao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagamentoComCartaoMockMvc.perform(post("/api/pagamento-com-cartaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagamentoComCartao)))
            .andExpect(status().isBadRequest());

        // Validate the PagamentoComCartao in the database
        List<PagamentoComCartao> pagamentoComCartaoList = pagamentoComCartaoRepository.findAll();
        assertThat(pagamentoComCartaoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPagamentoComCartaos() throws Exception {
        // Initialize the database
        pagamentoComCartaoRepository.saveAndFlush(pagamentoComCartao);

        // Get all the pagamentoComCartaoList
        restPagamentoComCartaoMockMvc.perform(get("/api/pagamento-com-cartaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagamentoComCartao.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroDeParcelas").value(hasItem(DEFAULT_NUMERO_DE_PARCELAS)));
    }
    
    @Test
    @Transactional
    public void getPagamentoComCartao() throws Exception {
        // Initialize the database
        pagamentoComCartaoRepository.saveAndFlush(pagamentoComCartao);

        // Get the pagamentoComCartao
        restPagamentoComCartaoMockMvc.perform(get("/api/pagamento-com-cartaos/{id}", pagamentoComCartao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pagamentoComCartao.getId().intValue()))
            .andExpect(jsonPath("$.numeroDeParcelas").value(DEFAULT_NUMERO_DE_PARCELAS));
    }

    @Test
    @Transactional
    public void getNonExistingPagamentoComCartao() throws Exception {
        // Get the pagamentoComCartao
        restPagamentoComCartaoMockMvc.perform(get("/api/pagamento-com-cartaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePagamentoComCartao() throws Exception {
        // Initialize the database
        pagamentoComCartaoService.save(pagamentoComCartao);

        int databaseSizeBeforeUpdate = pagamentoComCartaoRepository.findAll().size();

        // Update the pagamentoComCartao
        PagamentoComCartao updatedPagamentoComCartao = pagamentoComCartaoRepository.findById(pagamentoComCartao.getId()).get();
        // Disconnect from session so that the updates on updatedPagamentoComCartao are not directly saved in db
        em.detach(updatedPagamentoComCartao);
        updatedPagamentoComCartao
            .numeroDeParcelas(UPDATED_NUMERO_DE_PARCELAS);

        restPagamentoComCartaoMockMvc.perform(put("/api/pagamento-com-cartaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPagamentoComCartao)))
            .andExpect(status().isOk());

        // Validate the PagamentoComCartao in the database
        List<PagamentoComCartao> pagamentoComCartaoList = pagamentoComCartaoRepository.findAll();
        assertThat(pagamentoComCartaoList).hasSize(databaseSizeBeforeUpdate);
        PagamentoComCartao testPagamentoComCartao = pagamentoComCartaoList.get(pagamentoComCartaoList.size() - 1);
        assertThat(testPagamentoComCartao.getNumeroDeParcelas()).isEqualTo(UPDATED_NUMERO_DE_PARCELAS);
    }

    @Test
    @Transactional
    public void updateNonExistingPagamentoComCartao() throws Exception {
        int databaseSizeBeforeUpdate = pagamentoComCartaoRepository.findAll().size();

        // Create the PagamentoComCartao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagamentoComCartaoMockMvc.perform(put("/api/pagamento-com-cartaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagamentoComCartao)))
            .andExpect(status().isBadRequest());

        // Validate the PagamentoComCartao in the database
        List<PagamentoComCartao> pagamentoComCartaoList = pagamentoComCartaoRepository.findAll();
        assertThat(pagamentoComCartaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePagamentoComCartao() throws Exception {
        // Initialize the database
        pagamentoComCartaoService.save(pagamentoComCartao);

        int databaseSizeBeforeDelete = pagamentoComCartaoRepository.findAll().size();

        // Delete the pagamentoComCartao
        restPagamentoComCartaoMockMvc.perform(delete("/api/pagamento-com-cartaos/{id}", pagamentoComCartao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PagamentoComCartao> pagamentoComCartaoList = pagamentoComCartaoRepository.findAll();
        assertThat(pagamentoComCartaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagamentoComCartao.class);
        PagamentoComCartao pagamentoComCartao1 = new PagamentoComCartao();
        pagamentoComCartao1.setId(1L);
        PagamentoComCartao pagamentoComCartao2 = new PagamentoComCartao();
        pagamentoComCartao2.setId(pagamentoComCartao1.getId());
        assertThat(pagamentoComCartao1).isEqualTo(pagamentoComCartao2);
        pagamentoComCartao2.setId(2L);
        assertThat(pagamentoComCartao1).isNotEqualTo(pagamentoComCartao2);
        pagamentoComCartao1.setId(null);
        assertThat(pagamentoComCartao1).isNotEqualTo(pagamentoComCartao2);
    }
}
