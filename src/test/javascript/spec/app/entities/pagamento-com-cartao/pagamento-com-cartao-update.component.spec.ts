/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TestehipsterTestModule } from '../../../test.module';
import { PagamentoComCartaoUpdateComponent } from 'app/entities/pagamento-com-cartao/pagamento-com-cartao-update.component';
import { PagamentoComCartaoService } from 'app/entities/pagamento-com-cartao/pagamento-com-cartao.service';
import { PagamentoComCartao } from 'app/shared/model/pagamento-com-cartao.model';

describe('Component Tests', () => {
  describe('PagamentoComCartao Management Update Component', () => {
    let comp: PagamentoComCartaoUpdateComponent;
    let fixture: ComponentFixture<PagamentoComCartaoUpdateComponent>;
    let service: PagamentoComCartaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestehipsterTestModule],
        declarations: [PagamentoComCartaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PagamentoComCartaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagamentoComCartaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagamentoComCartaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PagamentoComCartao(123);
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
        const entity = new PagamentoComCartao();
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
