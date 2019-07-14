import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagamentoComCartao } from 'app/shared/model/pagamento-com-cartao.model';
import { PagamentoComCartaoService } from './pagamento-com-cartao.service';

@Component({
  selector: 'jhi-pagamento-com-cartao-delete-dialog',
  templateUrl: './pagamento-com-cartao-delete-dialog.component.html'
})
export class PagamentoComCartaoDeleteDialogComponent {
  pagamentoComCartao: IPagamentoComCartao;

  constructor(
    protected pagamentoComCartaoService: PagamentoComCartaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pagamentoComCartaoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'pagamentoComCartaoListModification',
        content: 'Deleted an pagamentoComCartao'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-pagamento-com-cartao-delete-popup',
  template: ''
})
export class PagamentoComCartaoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pagamentoComCartao }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PagamentoComCartaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.pagamentoComCartao = pagamentoComCartao;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/pagamento-com-cartao', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/pagamento-com-cartao', { outlets: { popup: null } }]);
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
