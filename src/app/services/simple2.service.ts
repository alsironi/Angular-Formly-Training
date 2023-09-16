import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()
export class SimpleService2 {
  constructor(private http: HttpClient) {}

  getUserData2(): Observable<any> { 
    return this.http.get<FormlyFieldConfig[]>('assets/json/simple-form-2.json');
  }

}