import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { HomePageComponent } from './homepage.component';
import { HomePageRoutingModule } from './homepage-routing.module';
import { SimpleService1 } from '../services/simple1.service';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    MatButtonModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
  ],
  providers: [ {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: appearance
  },
     SimpleService1]
})
export class HomePageModule { }
