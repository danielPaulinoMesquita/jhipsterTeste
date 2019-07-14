import { IPagamento } from 'app/shared/model/pagamento.model';

export interface IPagamentoComCartao {
  id?: number;
  numeroDeParcelas?: number;
  pagamento?: IPagamento;
}

export class PagamentoComCartao implements IPagamentoComCartao {
  constructor(public id?: number, public numeroDeParcelas?: number, public pagamento?: IPagamento) {}
}
