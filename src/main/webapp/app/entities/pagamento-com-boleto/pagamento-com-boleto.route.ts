import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PagamentoComBoleto } from 'app/shared/model/pagamento-com-boleto.model';
import { PagamentoComBoletoService } from './pagamento-com-boleto.service';
import { PagamentoComBoletoComponent } from './pagamento-com-boleto.component';
import { PagamentoComBoletoDetailComponent } from './pagamento-com-boleto-detail.component';
import { PagamentoComBoletoUpdateComponent } from './pagamento-com-boleto-update.component';
import { PagamentoComBoletoDeletePopupComponent } from './pagamento-com-boleto-delete-dialog.component';
import { IPagamentoComBoleto } from 'app/shared/model/pagamento-com-boleto.model';

@Injectable({ providedIn: 'root' })
export class PagamentoComBoletoResolve implements Resolve<IPagamentoComBoleto> {
  constructor(private service: PagamentoComBoletoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPagamentoComBoleto> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PagamentoComBoleto>) => response.ok),
        map((pagamentoComBoleto: HttpResponse<PagamentoComBoleto>) => pagamentoComBoleto.body)
      );
    }
    return of(new PagamentoComBoleto());
  }
}

export const pagamentoComBoletoRoute: Routes = [
  {
    path: '',
    component: PagamentoComBoletoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testehipsterApp.pagamentoComBoleto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PagamentoComBoletoDetailComponent,
    resolve: {
      pagamentoComBoleto: PagamentoComBoletoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testehipsterApp.pagamentoComBoleto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PagamentoComBoletoUpdateComponent,
    resolve: {
      pagamentoComBoleto: PagamentoComBoletoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testehipsterApp.pagamentoComBoleto.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PagamentoComBoletoUpdateComponent,
    resolve: {
      pagamentoComBoleto: PagamentoComBoletoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testehipsterApp.pagamentoComBoleto.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pagamentoComBoletoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PagamentoComBoletoDeletePopupComponent,
    resolve: {
      pagamentoComBoleto: PagamentoComBoletoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'testehipsterApp.pagamentoComBoleto.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
