import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteNewDto } from 'app/shared/model/clienteNewDto.model';

type EntityResponseType = HttpResponse<ICliente>;
type EntityResponseTypeDTO = HttpResponse<ClienteNewDto>;

type EntityArrayResponseType = HttpResponse<ICliente[]>;

@Injectable({ providedIn: 'root' })
export class ClienteService {
  public resourceUrl = SERVER_API_URL + 'api/clientes';

  constructor(protected http: HttpClient) {}

  //Novos metodos
  createCliente(cliente: ClienteNewDto): Observable<EntityResponseTypeDTO> {
    return this.http.post<ClienteNewDto>(SERVER_API_URL + 'api/clientesNew', cliente, { observe: 'response' });
  }

  updateCliente(cliente: ClienteNewDto): Observable<EntityResponseTypeDTO> {
    return this.http.put<ClienteNewDto>(SERVER_API_URL + 'api/clientesNew', cliente, { observe: 'response' });
  }
  //Final dos novos metodos

  create(cliente: ICliente): Observable<EntityResponseType> {
    return this.http.post<ICliente>(this.resourceUrl, cliente, { observe: 'response' });
  }

  update(cliente: ICliente): Observable<EntityResponseType> {
    return this.http.put<ICliente>(this.resourceUrl, cliente, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICliente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICliente[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
