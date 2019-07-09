import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestehipsterSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [TestehipsterSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [TestehipsterSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestehipsterSharedModule {
  static forRoot() {
    return {
      ngModule: TestehipsterSharedModule
    };
  }
}
