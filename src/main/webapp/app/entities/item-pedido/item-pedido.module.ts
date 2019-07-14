import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TestehipsterSharedModule } from 'app/shared';
import {
  ItemPedidoComponent,
  ItemPedidoDetailComponent,
  ItemPedidoUpdateComponent,
  ItemPedidoDeletePopupComponent,
  ItemPedidoDeleteDialogComponent,
  itemPedidoRoute,
  itemPedidoPopupRoute
} from './';

const ENTITY_STATES = [...itemPedidoRoute, ...itemPedidoPopupRoute];

@NgModule({
  imports: [TestehipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ItemPedidoComponent,
    ItemPedidoDetailComponent,
    ItemPedidoUpdateComponent,
    ItemPedidoDeleteDialogComponent,
    ItemPedidoDeletePopupComponent
  ],
  entryComponents: [ItemPedidoComponent, ItemPedidoUpdateComponent, ItemPedidoDeleteDialogComponent, ItemPedidoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestehipsterItemPedidoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
