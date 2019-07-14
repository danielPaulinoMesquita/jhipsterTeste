import { IPagamento } from 'app/shared/model/pagamento.model';

export interface IPagamentoComBoleto {
  id?: number;
  dataVencimento?: string;
  dataPagamento?: string;
  pagamento?: IPagamento;
}

export class PagamentoComBoleto implements IPagamentoComBoleto {
  constructor(public id?: number, public dataVencimento?: string, public dataPagamento?: string, public pagamento?: IPagamento) {}
}
