import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings/settings.component';
import {SharedModule} from '../shared/shared.module';
import {EmailService} from './shared/email.service';
import {PreviewComponent} from './preview/preview.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [SettingsComponent],
  declarations: [SettingsComponent, PreviewComponent],
  providers: [
    EmailService
  ]
})
export class NewsletterModule {
}
