import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { MaterialModule } from "./material.module";
import { FormlyMaterialModule } from '@ngx-formly/material';

import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {FormlyMatCheckboxModule} from '@ngx-formly/material/checkbox';
import {FormlyMatSelectModule} from '@ngx-formly/material/select';

import { HomePageModule } from './homepage/homepage.module';

import {SharedService } from './services/shared.service';


const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HomePageModule,
    MatTableModule,
    MatInputModule,
    FormlyMatSelectModule,
    FormlyMatCheckboxModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),//to pass extra config, register custom field types, wrappers, extensions and validation
    FormlyMaterialModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [ 
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
    , SharedService
     
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
