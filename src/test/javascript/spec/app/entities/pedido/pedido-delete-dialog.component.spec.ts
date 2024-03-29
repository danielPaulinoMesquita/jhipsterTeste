/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestehipsterTestModule } from '../../../test.module';
import { PedidoDeleteDialogComponent } from 'app/entities/pedido/pedido-delete-dialog.component';
import { PedidoService } from 'app/entities/pedido/pedido.service';

describe('Component Tests', () => {
  describe('Pedido Management Delete Component', () => {
    let comp: PedidoDeleteDialogComponent;
    let fixture: ComponentFixture<PedidoDeleteDialogComponent>;
    let service: PedidoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestehipsterTestModule],
        declarations: [PedidoDeleteDialogComponent]
      })
        .overrideTemplate(PedidoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PedidoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PedidoService);
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
