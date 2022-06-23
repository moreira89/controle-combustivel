import { DEFAULT_CURRENCY_CODE, enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule,{
  providers: [/*{provide: LOCALE_ID, useValue: 'pt-BR'}*/], /*mantida configuração "antiga" no app.modules, pois por aqui não está sendo aplicado corretamente*/
})
  .catch(err => console.error(err));
