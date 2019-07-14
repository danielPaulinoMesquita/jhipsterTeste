import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TestehipsterSharedModule } from 'app/shared';
import {
  PagamentoComBoletoComponent,
  PagamentoComBoletoDetailComponent,
  PagamentoComBoletoUpdateComponent,
  PagamentoComBoletoDeletePopupComponent,
  PagamentoComBoletoDeleteDialogComponent,
  pagamentoComBoletoRoute,
  pagamentoComBoletoPopupRoute
} from './';

const ENTITY_STATES = [...pagamentoComBoletoRoute, ...pagamentoComBoletoPopupRoute];

@NgModule({
  imports: [TestehipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PagamentoComBoletoComponent,
    PagamentoComBoletoDetailComponent,
    PagamentoComBoletoUpdateComponent,
    PagamentoComBoletoDeleteDialogComponent,
    PagamentoComBoletoDeletePopupComponent
  ],
  entryComponents: [
    PagamentoComBoletoComponent,
    PagamentoComBoletoUpdateComponent,
    PagamentoComBoletoDeleteDialogComponent,
    PagamentoComBoletoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestehipsterPagamentoComBoletoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
