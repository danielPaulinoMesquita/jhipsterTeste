import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagamentoComBoleto } from 'app/shared/model/pagamento-com-boleto.model';
import { PagamentoComBoletoService } from './pagamento-com-boleto.service';

@Component({
  selector: 'jhi-pagamento-com-boleto-delete-dialog',
  templateUrl: './pagamento-com-boleto-delete-dialog.component.html'
})
export class PagamentoComBoletoDeleteDialogComponent {
  pagamentoComBoleto: IPagamentoComBoleto;

  constructor(
    protected pagamentoComBoletoService: PagamentoComBoletoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pagamentoComBoletoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'pagamentoComBoletoListModification',
        content: 'Deleted an pagamentoComBoleto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-pagamento-com-boleto-delete-popup',
  template: ''
})
export class PagamentoComBoletoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pagamentoComBoleto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PagamentoComBoletoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.pagamentoComBoleto = pagamentoComBoleto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/pagamento-com-boleto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/pagamento-com-boleto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
