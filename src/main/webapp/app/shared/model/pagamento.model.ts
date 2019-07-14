export const enum EstadoPagamento {
  PENDENTE = 'PENDENTE',
  QUITADO = 'QUITADO',
  CANCELADO = 'CANCELADO'
}

export interface IPagamento {
  id?: number;
  estado?: EstadoPagamento;
}

export class Pagamento implements IPagamento {
  constructor(public id?: number, public estado?: EstadoPagamento) {}
}
