import { IPedido } from 'app/shared/model/pedido.model';
import { ICategoria } from 'app/shared/model/categoria.model';

export interface IProduto {
  id?: number;
  nome?: string;
  preco?: number;
  pedidos?: IPedido[];
  categorias?: ICategoria[];
}

export class Produto implements IProduto {
  constructor(
    public id?: number,
    public nome?: string,
    public preco?: number,
    public pedidos?: IPedido[],
    public categorias?: ICategoria[]
  ) {}
}
