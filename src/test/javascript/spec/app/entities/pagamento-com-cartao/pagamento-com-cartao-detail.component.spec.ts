/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestehipsterTestModule } from '../../../test.module';
import { PagamentoComCartaoDetailComponent } from 'app/entities/pagamento-com-cartao/pagamento-com-cartao-detail.component';
import { PagamentoComCartao } from 'app/shared/model/pagamento-com-cartao.model';

describe('Component Tests', () => {
  describe('PagamentoComCartao Management Detail Component', () => {
    let comp: PagamentoComCartaoDetailComponent;
    let fixture: ComponentFixture<PagamentoComCartaoDetailComponent>;
    const route = ({ data: of({ pagamentoComCartao: new PagamentoComCartao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestehipsterTestModule],
        declarations: [PagamentoComCartaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PagamentoComCartaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagamentoComCartaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pagamentoComCartao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
