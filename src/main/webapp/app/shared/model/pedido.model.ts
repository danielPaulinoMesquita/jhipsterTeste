import { IPagamento } from 'app/shared/model/pagamento.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { IProduto } from 'app/shared/model/produto.model';

export interface IPedido {
  id?: number;
  instante?: string;
  pagamento?: IPagamento;
  cliente?: ICliente;
  produtos?: IProduto[];
}

export class Pedido implements IPedido {
  constructor(
    public id?: number,
    public instante?: string,
    public pagamento?: IPagamento,
    public cliente?: ICliente,
    public produtos?: IProduto[]
  ) {}
}
