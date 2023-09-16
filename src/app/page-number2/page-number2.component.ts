import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { SimpleService2 } from '../services/simple2.service';
import {SharedService } from '../services/shared.service';
import { tableRegistroInterface } from '../models/table-registro.interface';

//modulos del routing para pasar el data del this.model
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-page-number2',
  templateUrl: './page-number2.component.html',
  styleUrls: ['../app.component.scss']
})
export class PageNumber2Component implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  item: any= {};;
  fields: FormlyFieldConfig[] = [];
  isTableVisible = true;
  showButton = false;
  checkInterval: any;
  showHomepageButton: boolean = false;
  isLoading = true; // Para mostrar el loader mientras los datos cargan
  users: tableRegistroInterface [] = [];

  constructor(private simpleService2: SimpleService2, private router: Router, private activatedRoute: ActivatedRoute, private sharedService: SharedService) {}

  //Esperar que se inicialice la base de datos; await this.sharedService.initIndexedDB();
  async ngOnInit () {
    try {
      // 1. Simulamos una carga de datos de 5 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));
        //1.2. 
      const data = await this.sharedService.getData(1);
      //asegurarte que la estructura de los datos recibidos de sharedService.getData() coincide con lo que tu tabla espera
      console.log("5. Datos recibidos desde sharedService:", data);
      //listado de campos
      this.users.push(data as tableRegistroInterface);
      console.log("6. Datos que recibe la tabla:", data);
      this.isLoading = false; // Ocultamos el loader
    } catch (error) {
      console.error('Error cargando los datos:', error);
      this.isLoading = false; // Ocultamos el loader
    }
    
    // this.fetchSimple2();
  }

  // fetchSimple2() {
  //   this.simpleService2.getUserData2().subscribe(fields => {
  //     this.fields = fields;
  //     this.isTableVisible = true;

  //     this.checkInterval = setInterval(() => {
  //       const formControl = this.form.get('mySelect');
  //       if (formControl) {
  //         clearInterval(this.checkInterval);
  //         formControl.valueChanges.subscribe(value => {
  //           this.showButton = value === 2;
  //         });
  //       }
  //     }, 300);
  //   });
  // }

  goToHomepage() {
    this.showHomepageButton = false;
  }

  //ya no necesito el submit
  // onSubmit() {
  //   if (this.form.valid) {
  //     console.log('Formulario es válido');
  //   } else {
  //     console.log('Formulario no es válido');
  //   }
  // }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}