import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatTooltipModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule,
  MatSelectModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoginComponent} from './molecules/login/login.component';
import {AuthService} from './services/auth.service';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import {ColorPickerModule} from 'ngx-color-picker';
import {ClipboardModule} from 'ngx-clipboard/dist';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    // Color picker
    ColorPickerModule,
    // Clipboard module
    ClipboardModule,
    // Material Modules
    FlexLayoutModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    // Color picker
    ColorPickerModule,
    // Clipboard module
    ClipboardModule,
    // Material Modules
    FlexLayoutModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  declarations: [
    LoginComponent
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [
    AuthService,
    HttpService
  ]
})
export class SharedModule {
}
