import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { SimpleService1 } from '../services/simple1.service';
import {SharedService } from '../services/shared.service';
import { tableRegistroInterface } from '../models/table-registro.interface';
import { OnlineOfflineService } from '../services/online-offline.service';

//modulos del routing para pasar el data del this.model
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../app.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  isTableVisible = false;
  checkInterval: any;
  showHomepageButton: boolean = false;
  records: tableRegistroInterface[] = []; // Almacenar registros con esta interfaz

  constructor(private simpleService1: SimpleService1, private router: Router, private activatedRoute: ActivatedRoute, private sharedService: SharedService, private onlineOfflineService: OnlineOfflineService) {
    // Manejar múltiples registros: Cargar registros existentes al inicio
    // this.sharedService.getData(1).then(data => {
    //   this.records = data;
    // });
  }

  ngOnInit(): void {
    this.fetchSimple1();
  }

  fetchSimple1() {
    this.simpleService1.getUserData1().subscribe(fields => {
      this.fields = fields;

      //Logica para Selects Dinámicos

      //configuramos un intervalo para verificar si los campos relevantes se han creado
      this.checkInterval = setInterval(() => {
        //almacenamos los selects relevantes en variables
        const documentControl = this.form.get('document'); // 'document' es 'mySelect' en fetch2()
        // if(this.form.invalid){
        
        // }
        const countryField = this.fields.find(field => field.key === 'country');
        //si los campos existen limpiame el intervalo
        if (documentControl && countryField) {
          // countryField.formControl.disable();
          // countryField.templateOptions['disabled'] = true;
          clearInterval(this.checkInterval);
          //subscribeme las siguientes variables mediante "valueChanges" a mi campo document
          documentControl.valueChanges.subscribe(value => {
            const countries = [
              { id: '1', name: 'spain', documentId: '1' },
              { id: '2', name: 'germany', documentId: '1' },
              { id: '3', name: 'italy', documentId: '1' },
              { id: '4', name: 'Malta', documentId: '2' },
              { id: '5', name: 'Seychelles', documentId: '2' },
              { id: '6', name: 'Australia', documentId: '2' }
            ];
            //documentId va a ser igual al valor de "document"
            const documentId = value;
            //esta variable almacena que los "countries" se filtren segun su propiedad "documentId" (busca en las opciones filtradas)
            const filteredOptions = countries.filter(country => country.documentId === documentId);
  
            // Si "country" existe (si hay un campo en this.fields con la clave 'country')
            if (countryField) {
              // Verificación de que la primera etiqueta de "formControl" se ha generado
              if (countryField.formControl && countryField.templateOptions) { 
                //buscamos en "filteredOptions" si el valor actualmente seleccionado en countryField es valido segun lo seleccionado en "document". Si no se encuentra ninguna opción que coincida, se establece el valor de "country" en null
                if (!filteredOptions.find(option => option.id === countryField.formControl?.value)) {
                  countryField.formControl.setValue(null);
                }
            
                // Actualizacion de las opciones del campo 'country'
                countryField.templateOptions.options = filteredOptions;
              }
            }
          });
        }
      }, 300);
    });
  }

 
  // goToPage2() {
  //   this.showHomepageButton = true;
  // }

  //Esperar que se inicialice la base de datos; await this.sharedService.initIndexedDB();
  async onSubmit() {
    if (this.form.valid) {
      //machacamos "this.model" (objeto completo no pasable a indexedDB) para almacenar los datos del formulario
      const dataToStore: tableRegistroInterface = {
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        document: this.model.document,
        country: this.model.country,
        doc: this.model.doc,
        agree: this.model.agree
      };
      //Utilizamos "dataToStore" en lugar de "this.model" directamente (sharedService.setData(this.model)). Aquí es donde se rellenará el almacén de objetos "formData" de IndexedDB. Guardar datos en IndexedDB
      this.sharedService.setData(dataToStore)
        // Añadir al arreglo local para reflejar el cambio en la tabla
        .then(() => {console.log('3. Datos almacenados con éxito'); this.records.push(dataToStore);} )
        .catch(err => console.log('Error al almacenar datos', err));
      this.router.navigate(['page-number2']);
      console.log('1.Formulario es válido');

    } else {
      console.log('Formulario no es válido');
    }
    
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
