import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagamentoComCartao } from 'app/shared/model/pagamento-com-cartao.model';

@Component({
  selector: 'jhi-pagamento-com-cartao-detail',
  templateUrl: './pagamento-com-cartao-detail.component.html'
})
export class PagamentoComCartaoDetailComponent implements OnInit {
  pagamentoComCartao: IPagamentoComCartao;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pagamentoComCartao }) => {
      this.pagamentoComCartao = pagamentoComCartao;
    });
  }

  previousState() {
    window.history.back();
  }
}
