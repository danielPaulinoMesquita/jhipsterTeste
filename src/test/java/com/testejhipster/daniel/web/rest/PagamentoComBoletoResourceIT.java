package com.testejhipster.daniel.web.rest;

import com.testejhipster.daniel.TestehipsterApp;
import com.testejhipster.daniel.domain.PagamentoComBoleto;
import com.testejhipster.daniel.repository.PagamentoComBoletoRepository;
import com.testejhipster.daniel.service.PagamentoComBoletoService;
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
import java.util.Date;
import java.util.List;

import static com.testejhipster.daniel.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PagamentoComBoletoResource} REST controller.
 */
@SpringBootTest(classes = TestehipsterApp.class)
public class PagamentoComBoletoResourceIT {

    private static final Date DEFAULT_DATA_VENCIMENTO = new Date();
    private static final Date UPDATED_DATA_VENCIMENTO = new Date();

    private static final Date DEFAULT_DATA_PAGAMENTO = new Date();
    private static final Date UPDATED_DATA_PAGAMENTO = new Date();

    @Autowired
    private PagamentoComBoletoRepository pagamentoComBoletoRepository;

    @Autowired
    private PagamentoComBoletoService pagamentoComBoletoService;

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

    private MockMvc restPagamentoComBoletoMockMvc;

    private PagamentoComBoleto pagamentoComBoleto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PagamentoComBoletoResource pagamentoComBoletoResource = new PagamentoComBoletoResource(pagamentoComBoletoService);
        this.restPagamentoComBoletoMockMvc = MockMvcBuilders.standaloneSetup(pagamentoComBoletoResource)
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
    public static PagamentoComBoleto createEntity(EntityManager em) {
        PagamentoComBoleto pagamentoComBoleto = new PagamentoComBoleto()
            .dataVencimento(DEFAULT_DATA_VENCIMENTO)
            .dataPagamento(DEFAULT_DATA_PAGAMENTO);
        return pagamentoComBoleto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PagamentoComBoleto createUpdatedEntity(EntityManager em) {
        PagamentoComBoleto pagamentoComBoleto = new PagamentoComBoleto()
            .dataVencimento(UPDATED_DATA_VENCIMENTO)
            .dataPagamento(UPDATED_DATA_PAGAMENTO);
        return pagamentoComBoleto;
    }

    @BeforeEach
    public void initTest() {
        pagamentoComBoleto = createEntity(em);
    }

    @Test
    @Transactional
    public void createPagamentoComBoleto() throws Exception {
        int databaseSizeBeforeCreate = pagamentoComBoletoRepository.findAll().size();

        // Create the PagamentoComBoleto
        restPagamentoComBoletoMockMvc.perform(post("/api/pagamento-com-boletos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagamentoComBoleto)))
            .andExpect(status().isCreated());

        // Validate the PagamentoComBoleto in the database
        List<PagamentoComBoleto> pagamentoComBoletoList = pagamentoComBoletoRepository.findAll();
        assertThat(pagamentoComBoletoList).hasSize(databaseSizeBeforeCreate + 1);
        PagamentoComBoleto testPagamentoComBoleto = pagamentoComBoletoList.get(pagamentoComBoletoList.size() - 1);
        assertThat(testPagamentoComBoleto.getDataVencimento()).isEqualTo(DEFAULT_DATA_VENCIMENTO);
        assertThat(testPagamentoComBoleto.getDataPagamento()).isEqualTo(DEFAULT_DATA_PAGAMENTO);
    }

    @Test
    @Transactional
    public void createPagamentoComBoletoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pagamentoComBoletoRepository.findAll().size();

        // Create the PagamentoComBoleto with an existing ID
        pagamentoComBoleto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagamentoComBoletoMockMvc.perform(post("/api/pagamento-com-boletos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagamentoComBoleto)))
            .andExpect(status().isBadRequest());

        // Validate the PagamentoComBoleto in the database
        List<PagamentoComBoleto> pagamentoComBoletoList = pagamentoComBoletoRepository.findAll();
        assertThat(pagamentoComBoletoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPagamentoComBoletos() throws Exception {
        // Initialize the database
        pagamentoComBoletoRepository.saveAndFlush(pagamentoComBoleto);

        // Get all the pagamentoComBoletoList
        restPagamentoComBoletoMockMvc.perform(get("/api/pagamento-com-boletos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagamentoComBoleto.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataVencimento").value(hasItem(DEFAULT_DATA_VENCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].dataPagamento").value(hasItem(DEFAULT_DATA_PAGAMENTO.toString())));
    }
    
    @Test
    @Transactional
    public void getPagamentoComBoleto() throws Exception {
        // Initialize the database
        pagamentoComBoletoRepository.saveAndFlush(pagamentoComBoleto);

        // Get the pagamentoComBoleto
        restPagamentoComBoletoMockMvc.perform(get("/api/pagamento-com-boletos/{id}", pagamentoComBoleto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pagamentoComBoleto.getId().intValue()))
            .andExpect(jsonPath("$.dataVencimento").value(DEFAULT_DATA_VENCIMENTO.toString()))
            .andExpect(jsonPath("$.dataPagamento").value(DEFAULT_DATA_PAGAMENTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPagamentoComBoleto() throws Exception {
        // Get the pagamentoComBoleto
        restPagamentoComBoletoMockMvc.perform(get("/api/pagamento-com-boletos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePagamentoComBoleto() throws Exception {
        // Initialize the database
        pagamentoComBoletoService.save(pagamentoComBoleto);

        int databaseSizeBeforeUpdate = pagamentoComBoletoRepository.findAll().size();

        // Update the pagamentoComBoleto
        PagamentoComBoleto updatedPagamentoComBoleto = pagamentoComBoletoRepository.findById(pagamentoComBoleto.getId()).get();
        // Disconnect from session so that the updates on updatedPagamentoComBoleto are not directly saved in db
        em.detach(updatedPagamentoComBoleto);
        updatedPagamentoComBoleto
            .dataVencimento(UPDATED_DATA_VENCIMENTO)
            .dataPagamento(UPDATED_DATA_PAGAMENTO);

        restPagamentoComBoletoMockMvc.perform(put("/api/pagamento-com-boletos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPagamentoComBoleto)))
            .andExpect(status().isOk());

        // Validate the PagamentoComBoleto in the database
        List<PagamentoComBoleto> pagamentoComBoletoList = pagamentoComBoletoRepository.findAll();
        assertThat(pagamentoComBoletoList).hasSize(databaseSizeBeforeUpdate);
        PagamentoComBoleto testPagamentoComBoleto = pagamentoComBoletoList.get(pagamentoComBoletoList.size() - 1);
        assertThat(testPagamentoComBoleto.getDataVencimento()).isEqualTo(UPDATED_DATA_VENCIMENTO);
        assertThat(testPagamentoComBoleto.getDataPagamento()).isEqualTo(UPDATED_DATA_PAGAMENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingPagamentoComBoleto() throws Exception {
        int databaseSizeBeforeUpdate = pagamentoComBoletoRepository.findAll().size();

        // Create the PagamentoComBoleto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagamentoComBoletoMockMvc.perform(put("/api/pagamento-com-boletos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagamentoComBoleto)))
            .andExpect(status().isBadRequest());

        // Validate the PagamentoComBoleto in the database
        List<PagamentoComBoleto> pagamentoComBoletoList = pagamentoComBoletoRepository.findAll();
        assertThat(pagamentoComBoletoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePagamentoComBoleto() throws Exception {
        // Initialize the database
        pagamentoComBoletoService.save(pagamentoComBoleto);

        int databaseSizeBeforeDelete = pagamentoComBoletoRepository.findAll().size();

        // Delete the pagamentoComBoleto
        restPagamentoComBoletoMockMvc.perform(delete("/api/pagamento-com-boletos/{id}", pagamentoComBoleto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PagamentoComBoleto> pagamentoComBoletoList = pagamentoComBoletoRepository.findAll();
        assertThat(pagamentoComBoletoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagamentoComBoleto.class);
        PagamentoComBoleto pagamentoComBoleto1 = new PagamentoComBoleto();
        pagamentoComBoleto1.setId(1L);
        PagamentoComBoleto pagamentoComBoleto2 = new PagamentoComBoleto();
        pagamentoComBoleto2.setId(pagamentoComBoleto1.getId());
        assertThat(pagamentoComBoleto1).isEqualTo(pagamentoComBoleto2);
        pagamentoComBoleto2.setId(2L);
        assertThat(pagamentoComBoleto1).isNotEqualTo(pagamentoComBoleto2);
        pagamentoComBoleto1.setId(null);
        assertThat(pagamentoComBoleto1).isNotEqualTo(pagamentoComBoleto2);
    }
}
