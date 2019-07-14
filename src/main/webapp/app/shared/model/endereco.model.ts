import { ICliente } from 'app/shared/model/cliente.model';
import { ICidade } from 'app/shared/model/cidade.model';

export interface IEndereco {
  id?: number;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cliente?: ICliente;
  cidade?: ICidade;
}

export class Endereco implements IEndereco {
  constructor(
    public id?: number,
    public logradouro?: string,
    public numero?: string,
    public complemento?: string,
    public bairro?: string,
    public cep?: string,
    public cliente?: ICliente,
    public cidade?: ICidade
  ) {}
}
