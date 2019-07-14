import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TestehipsterSharedModule } from 'app/shared';
import {
  PagamentoComCartaoComponent,
  PagamentoComCartaoDetailComponent,
  PagamentoComCartaoUpdateComponent,
  PagamentoComCartaoDeletePopupComponent,
  PagamentoComCartaoDeleteDialogComponent,
  pagamentoComCartaoRoute,
  pagamentoComCartaoPopupRoute
} from './';

const ENTITY_STATES = [...pagamentoComCartaoRoute, ...pagamentoComCartaoPopupRoute];

@NgModule({
  imports: [TestehipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PagamentoComCartaoComponent,
    PagamentoComCartaoDetailComponent,
    PagamentoComCartaoUpdateComponent,
    PagamentoComCartaoDeleteDialogComponent,
    PagamentoComCartaoDeletePopupComponent
  ],
  entryComponents: [
    PagamentoComCartaoComponent,
    PagamentoComCartaoUpdateComponent,
    PagamentoComCartaoDeleteDialogComponent,
    PagamentoComCartaoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestehipsterPagamentoComCartaoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
