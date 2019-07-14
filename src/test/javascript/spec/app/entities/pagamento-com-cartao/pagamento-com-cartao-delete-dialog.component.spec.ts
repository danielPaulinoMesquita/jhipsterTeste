/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestehipsterTestModule } from '../../../test.module';
import { PagamentoComCartaoDeleteDialogComponent } from 'app/entities/pagamento-com-cartao/pagamento-com-cartao-delete-dialog.component';
import { PagamentoComCartaoService } from 'app/entities/pagamento-com-cartao/pagamento-com-cartao.service';

describe('Component Tests', () => {
  describe('PagamentoComCartao Management Delete Component', () => {
    let comp: PagamentoComCartaoDeleteDialogComponent;
    let fixture: ComponentFixture<PagamentoComCartaoDeleteDialogComponent>;
    let service: PagamentoComCartaoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestehipsterTestModule],
        declarations: [PagamentoComCartaoDeleteDialogComponent]
      })
        .overrideTemplate(PagamentoComCartaoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagamentoComCartaoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagamentoComCartaoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
