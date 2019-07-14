/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestehipsterTestModule } from '../../../test.module';
import { PagamentoComBoletoDetailComponent } from 'app/entities/pagamento-com-boleto/pagamento-com-boleto-detail.component';
import { PagamentoComBoleto } from 'app/shared/model/pagamento-com-boleto.model';

describe('Component Tests', () => {
  describe('PagamentoComBoleto Management Detail Component', () => {
    let comp: PagamentoComBoletoDetailComponent;
    let fixture: ComponentFixture<PagamentoComBoletoDetailComponent>;
    const route = ({ data: of({ pagamentoComBoleto: new PagamentoComBoleto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestehipsterTestModule],
        declarations: [PagamentoComBoletoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PagamentoComBoletoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagamentoComBoletoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pagamentoComBoleto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
