/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TestehipsterTestModule } from '../../../test.module';
import { PagamentoComBoletoUpdateComponent } from 'app/entities/pagamento-com-boleto/pagamento-com-boleto-update.component';
import { PagamentoComBoletoService } from 'app/entities/pagamento-com-boleto/pagamento-com-boleto.service';
import { PagamentoComBoleto } from 'app/shared/model/pagamento-com-boleto.model';

describe('Component Tests', () => {
  describe('PagamentoComBoleto Management Update Component', () => {
    let comp: PagamentoComBoletoUpdateComponent;
    let fixture: ComponentFixture<PagamentoComBoletoUpdateComponent>;
    let service: PagamentoComBoletoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestehipsterTestModule],
        declarations: [PagamentoComBoletoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PagamentoComBoletoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagamentoComBoletoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagamentoComBoletoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PagamentoComBoleto(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PagamentoComBoleto();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
