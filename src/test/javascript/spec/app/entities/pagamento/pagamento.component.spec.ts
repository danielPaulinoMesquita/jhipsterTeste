/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestehipsterTestModule } from '../../../test.module';
import { PagamentoComponent } from 'app/entities/pagamento/pagamento.component';
import { PagamentoService } from 'app/entities/pagamento/pagamento.service';
import { Pagamento } from 'app/shared/model/pagamento.model';

describe('Component Tests', () => {
  describe('Pagamento Management Component', () => {
    let comp: PagamentoComponent;
    let fixture: ComponentFixture<PagamentoComponent>;
    let service: PagamentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestehipsterTestModule],
        declarations: [PagamentoComponent],
        providers: []
      })
        .overrideTemplate(PagamentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagamentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagamentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Pagamento(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pagamentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
