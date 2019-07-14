import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPagamentoComBoleto } from 'app/shared/model/pagamento-com-boleto.model';

type EntityResponseType = HttpResponse<IPagamentoComBoleto>;
type EntityArrayResponseType = HttpResponse<IPagamentoComBoleto[]>;

@Injectable({ providedIn: 'root' })
export class PagamentoComBoletoService {
  public resourceUrl = SERVER_API_URL + 'api/pagamento-com-boletos';

  constructor(protected http: HttpClient) {}

  create(pagamentoComBoleto: IPagamentoComBoleto): Observable<EntityResponseType> {
    return this.http.post<IPagamentoComBoleto>(this.resourceUrl, pagamentoComBoleto, { observe: 'response' });
  }

  update(pagamentoComBoleto: IPagamentoComBoleto): Observable<EntityResponseType> {
    return this.http.put<IPagamentoComBoleto>(this.resourceUrl, pagamentoComBoleto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPagamentoComBoleto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPagamentoComBoleto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
