export interface IItemPedido {
  id?: number;
  desconto?: number;
  quantidade?: number;
  preco?: number;
}

export class ItemPedido implements IItemPedido {
  constructor(public id?: number, public desconto?: number, public quantidade?: number, public preco?: number) {}
}
