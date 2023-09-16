import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()
export class SimpleService1 {
  constructor(private http: HttpClient) {}

  getUserData1(): Observable<any> {
    return this.http.get<FormlyFieldConfig[]>('assets/json/simple-form-1.json');
  }
}