import { ICliente } from 'app/shared/model/cliente.model';

export interface ITelefone {
  id?: number;
  numero?: string;
  cliente?: ICliente;
}

export class Telefone implements ITelefone {
  constructor(public id?: number, public numero?: string, public cliente?: ICliente) {}
}
