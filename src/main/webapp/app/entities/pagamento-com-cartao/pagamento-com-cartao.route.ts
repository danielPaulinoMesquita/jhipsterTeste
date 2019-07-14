import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PagamentoComCartao } from 'app/shared/model/pagamento-com-cartao.model';
import { PagamentoComCartaoService } from './pagamento-com-cartao.service';
import { PagamentoComCartaoComponent } from './pagamento-com-cartao.component';
import { PagamentoComCartaoDetailComponent } from './pagamento-com-cartao-detail.component';
import { PagamentoComCartaoUpdateComponent } from './pagamento-com-cartao-update.component';
import { PagamentoComCartaoDeletePopupComponent } from './pagamento-com-cartao-delete-dialog.component';
import { IPagamentoComCartao } from 'app/shared/model/pagamento-com-cartao.model';

@Injectable({ providedIn: 'root' })
export class PagamentoComCartaoResolve implements Resolve<IPagamentoComCartao> {
  constructor(private service: PagamentoComCartaoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPagamentoComCartao> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PagamentoComCartao>) => response.ok),
        map((pagamentoComCartao: HttpResponse<PagamentoComCartao>) => pagamentoComCartao.body)
      );
    }
    return of(new PagamentoComCartao());
  }
}

export const pagamentoComCartaoRoute: Routes = [
  {
    path: '',
    component: PagamentoComCartaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testehipsterApp.pagamentoComCartao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PagamentoComCartaoDetailComponent,
    resolve: {
      pagamentoComCartao: PagamentoComCartaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testehipsterApp.pagamentoComCartao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PagamentoComCartaoUpdateComponent,
    resolve: {
      pagamentoComCartao: PagamentoComCartaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testehipsterApp.pagamentoComCartao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PagamentoComCartaoUpdateComponent,
    resolve: {
      pagamentoComCartao: PagamentoComCartaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testehipsterApp.pagamentoComCartao.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pagamentoComCartaoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PagamentoComCartaoDeletePopupComponent,
    resolve: {
      pagamentoComCartao: PagamentoComCartaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testehipsterApp.pagamentoComCartao.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
