/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestehipsterTestModule } from '../../../test.module';
import { PagamentoComCartaoComponent } from 'app/entities/pagamento-com-cartao/pagamento-com-cartao.component';
import { PagamentoComCartaoService } from 'app/entities/pagamento-com-cartao/pagamento-com-cartao.service';
import { PagamentoComCartao } from 'app/shared/model/pagamento-com-cartao.model';

describe('Component Tests', () => {
  describe('PagamentoComCartao Management Component', () => {
    let comp: PagamentoComCartaoComponent;
    let fixture: ComponentFixture<PagamentoComCartaoComponent>;
    let service: PagamentoComCartaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestehipsterTestModule],
        declarations: [PagamentoComCartaoComponent],
        providers: []
      })
        .overrideTemplate(PagamentoComCartaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagamentoComCartaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagamentoComCartaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PagamentoComCartao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pagamentoComCartaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
