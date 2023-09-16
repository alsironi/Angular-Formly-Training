import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()
export class utilityService {
  constructor(private http: HttpClient) {}

  //parencontrol: una instancia de FormlyFieldConfig (campos json),status (boolean): pestañas habilitadas/deshabilitadas; tabs (sustituir por fields): lo que se va a ver afectado(enable/disable). Si no se proporcionan cuales de ellas, todas se verán afectadas.	
  enableTabs(parentControl: FormlyFieldConfig, status: boolean, tabs?: string[], ){
    //Verifica si parentControl.fieldGroup existe. Si existe recorre todos los elementos.
    if (parentControl.fieldGroup) {
      parentControl.fieldGroup.forEach((tab: FormlyFieldConfig) => {
        //Comprobación de pestañas específicas (tabs): Si se proporcionan, verifica si la pestaña actual (tab.key) es una.
        let found = true;
        if (tabs){
          found = tabs.find(name => name === tab.key) ? true : false;
        }
        //si la pestaña actual (tab.key) está en la lista de tabs
        if (found){
          //Si tab.templateOptions existe
          if (tab.templateOptions) {
            //Si status es false, desactiva la pestaña
            if (!status){
              tab.templateOptions['active'] = false;
            }
            //uso de disabled (formulario desabilitado)
            tab.templateOptions.disabled = !status; 
          } 
        } 
      });
    }
  }
  
  showValidation(field: FormlyFieldConfig) {
    if(field.fieldGroup){
      //Si field.fieldGroup existe, se itera sobre cada elemento de ese grupo.
      field.fieldGroup.map((control: FormlyFieldConfig) => {
        //Si ese elemento también tiene un grupo de campos se llama a showValidation
        if(control.fieldGroup){
          this.showValidation(control);
        } else{
          //control.formControl existe y su estado es inválido
          if(control.formControl && control.formControl.invalid) {
            //mostrar mensaje 
            control.validation = {
              show: true
            };
          }
        }
      });
    }
  }

}