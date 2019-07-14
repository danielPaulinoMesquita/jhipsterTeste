import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TestehipsterSharedModule } from 'app/shared';
import {
  TelefoneComponent,
  TelefoneDetailComponent,
  TelefoneUpdateComponent,
  TelefoneDeletePopupComponent,
  TelefoneDeleteDialogComponent,
  telefoneRoute,
  telefonePopupRoute
} from './';

const ENTITY_STATES = [...telefoneRoute, ...telefonePopupRoute];

@NgModule({
  imports: [TestehipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TelefoneComponent,
    TelefoneDetailComponent,
    TelefoneUpdateComponent,
    TelefoneDeleteDialogComponent,
    TelefoneDeletePopupComponent
  ],
  entryComponents: [TelefoneComponent, TelefoneUpdateComponent, TelefoneDeleteDialogComponent, TelefoneDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestehipsterTelefoneModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
