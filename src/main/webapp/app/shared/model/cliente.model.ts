import { ITelefone } from 'app/shared/model/telefone.model';
import { IEndereco } from 'app/shared/model/endereco.model';

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
  telefone?: ITelefone;
  endereco?: IEndereco;
}
export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public cpfOuCnpj?: string,
    public tipo?: TipoCliente,
    public telefone?: ITelefone,
    public endereco?: IEndereco
  ) {}
}
