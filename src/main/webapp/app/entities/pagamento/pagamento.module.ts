import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TestehipsterSharedModule } from 'app/shared';
import {
  PagamentoComponent,
  PagamentoDetailComponent,
  PagamentoUpdateComponent,
  PagamentoDeletePopupComponent,
  PagamentoDeleteDialogComponent,
  pagamentoRoute,
  pagamentoPopupRoute
} from './';

const ENTITY_STATES = [...pagamentoRoute, ...pagamentoPopupRoute];

@NgModule({
  imports: [TestehipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PagamentoComponent,
    PagamentoDetailComponent,
    PagamentoUpdateComponent,
    PagamentoDeleteDialogComponent,
    PagamentoDeletePopupComponent
  ],
  entryComponents: [PagamentoComponent, PagamentoUpdateComponent, PagamentoDeleteDialogComponent, PagamentoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestehipsterPagamentoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
