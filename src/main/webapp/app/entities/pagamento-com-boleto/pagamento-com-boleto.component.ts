import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPagamentoComBoleto } from 'app/shared/model/pagamento-com-boleto.model';
import { AccountService } from 'app/core';
import { PagamentoComBoletoService } from './pagamento-com-boleto.service';

@Component({
  selector: 'jhi-pagamento-com-boleto',
  templateUrl: './pagamento-com-boleto.component.html'
})
export class PagamentoComBoletoComponent implements OnInit, OnDestroy {
  pagamentoComBoletos: IPagamentoComBoleto[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected pagamentoComBoletoService: PagamentoComBoletoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.pagamentoComBoletoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPagamentoComBoleto[]>) => res.ok),
        map((res: HttpResponse<IPagamentoComBoleto[]>) => res.body)
      )
      .subscribe(
        (res: IPagamentoComBoleto[]) => {
          this.pagamentoComBoletos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPagamentoComBoletos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPagamentoComBoleto) {
    return item.id;
  }

  registerChangeInPagamentoComBoletos() {
    this.eventSubscriber = this.eventManager.subscribe('pagamentoComBoletoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
