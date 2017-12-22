import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ROUTES} from './app.routes';
import {NewsletterModule} from './newsletter/newsletter.module';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, {useHash: false, preloadingStrategy: PreloadAllModules}),
    SharedModule,
    NewsletterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
