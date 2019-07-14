import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPagamentoComCartao } from 'app/shared/model/pagamento-com-cartao.model';
import { AccountService } from 'app/core';
import { PagamentoComCartaoService } from './pagamento-com-cartao.service';

@Component({
  selector: 'jhi-pagamento-com-cartao',
  templateUrl: './pagamento-com-cartao.component.html'
})
export class PagamentoComCartaoComponent implements OnInit, OnDestroy {
  pagamentoComCartaos: IPagamentoComCartao[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected pagamentoComCartaoService: PagamentoComCartaoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.pagamentoComCartaoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPagamentoComCartao[]>) => res.ok),
        map((res: HttpResponse<IPagamentoComCartao[]>) => res.body)
      )
      .subscribe(
        (res: IPagamentoComCartao[]) => {
          this.pagamentoComCartaos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPagamentoComCartaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPagamentoComCartao) {
    return item.id;
  }

  registerChangeInPagamentoComCartaos() {
    this.eventSubscriber = this.eventManager.subscribe('pagamentoComCartaoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
