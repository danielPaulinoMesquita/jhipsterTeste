import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPagamentoComCartao } from 'app/shared/model/pagamento-com-cartao.model';

type EntityResponseType = HttpResponse<IPagamentoComCartao>;
type EntityArrayResponseType = HttpResponse<IPagamentoComCartao[]>;

@Injectable({ providedIn: 'root' })
export class PagamentoComCartaoService {
  public resourceUrl = SERVER_API_URL + 'api/pagamento-com-cartaos';

  constructor(protected http: HttpClient) {}

  create(pagamentoComCartao: IPagamentoComCartao): Observable<EntityResponseType> {
    return this.http.post<IPagamentoComCartao>(this.resourceUrl, pagamentoComCartao, { observe: 'response' });
  }

  update(pagamentoComCartao: IPagamentoComCartao): Observable<EntityResponseType> {
    return this.http.put<IPagamentoComCartao>(this.resourceUrl, pagamentoComCartao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPagamentoComCartao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPagamentoComCartao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
