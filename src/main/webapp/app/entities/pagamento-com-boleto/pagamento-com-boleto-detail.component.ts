import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagamentoComBoleto } from 'app/shared/model/pagamento-com-boleto.model';

@Component({
  selector: 'jhi-pagamento-com-boleto-detail',
  templateUrl: './pagamento-com-boleto-detail.component.html'
})
export class PagamentoComBoletoDetailComponent implements OnInit {
  pagamentoComBoleto: IPagamentoComBoleto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pagamentoComBoleto }) => {
      this.pagamentoComBoleto = pagamentoComBoleto;
    });
  }

  previousState() {
    window.history.back();
  }
}
