import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { PageNumber2Component } from './page-number2.component';
import { PageNumber2RoutingModule } from './page-number2-routing.module';
//periodic element table
import { SimpleService2 } from '../services/simple2.service';


@NgModule({
  declarations: [
    PageNumber2Component
  ],
  imports: [
    CommonModule,
    PageNumber2RoutingModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
  ],
  providers: [ 
    SimpleService2
     
  ],
})
export class PageNumber2Module { }
