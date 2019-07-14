/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestehipsterTestModule } from '../../../test.module';
import { PagamentoComBoletoComponent } from 'app/entities/pagamento-com-boleto/pagamento-com-boleto.component';
import { PagamentoComBoletoService } from 'app/entities/pagamento-com-boleto/pagamento-com-boleto.service';
import { PagamentoComBoleto } from 'app/shared/model/pagamento-com-boleto.model';

describe('Component Tests', () => {
  describe('PagamentoComBoleto Management Component', () => {
    let comp: PagamentoComBoletoComponent;
    let fixture: ComponentFixture<PagamentoComBoletoComponent>;
    let service: PagamentoComBoletoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestehipsterTestModule],
        declarations: [PagamentoComBoletoComponent],
        providers: []
      })
        .overrideTemplate(PagamentoComBoletoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagamentoComBoletoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagamentoComBoletoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PagamentoComBoleto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pagamentoComBoletos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
