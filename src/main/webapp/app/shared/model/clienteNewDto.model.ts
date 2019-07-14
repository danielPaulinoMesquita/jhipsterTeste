export const enum TipoCliente {
  PESSOAFISICA = 'PESSOAFISICA',
  PESSOAJURIDICA = 'PESSOAJURIDICA'
}

export interface ICliente {
  id?: number;
  nome?: string;
  email?: string;
  cpfOuCnpj?: string;
  tipo?: TipoCliente;
  telefones?: string;
  logradouro?: string;
  numero?: number;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidadeNome?: string;
  estadoNome?: string;
}

export class ClienteNewDto implements ICliente {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public cpfOuCnpj?: string,
    public tipo?: TipoCliente,
    public telefones?: string,
    public logradouro?: string,
    public numero?: number,
    public complemento?: string,
    public bairro?: string,
    public cep?: string,
    public cidadeNome?: string,
    public estadoNome?: string
  ) {}
}
