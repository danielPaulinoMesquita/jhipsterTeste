import { IEstado } from 'app/shared/model/estado.model';

export interface ICidade {
  id?: number;
  nome?: string;
  estado?: IEstado;
}

export class Cidade implements ICidade {
  constructor(public id?: number, public nome?: string, public estado?: IEstado) {}
}
