import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnlineOfflineService } from './online-offline.service';
import { tableRegistroInterface } from '../models/table-registro.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private db: IDBDatabase | undefined;
  //Arreglo para evitar que getData y setData se inicien antes que la ddbb
  private dbReady: Promise<void>;

  //0. Inicializamos todas las propiedades de la clase "SharedService"
  constructor(
    private http: HttpClient,
     // 0.1. Inyeccion del servicio "offline/online"
    private onlineOfflineService: OnlineOfflineService
  ) {
    this.dbReady = this.initIndexedDB();
    //0.2. Me suscribo al Observable "connectionChanged" (online/offline)
      //Esto va aqui, dentro del constructor, para garantizar que la suscripción se establezca tan pronto como se inicie el servicio
    this.onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        // ?.1. Si estoy online > haz algo
      } else {
        // ?.2. Si NO estoy online > haz algo
      }
    });
  }

  async initIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      //1. creo ddbb, solo tienes que "solicitarla" (request)
      const request = indexedDB.open("myTable", 1);
      //1.1. Eventos nativos de IndexedDB, parte del ciclo de vida de sus ddbb (sin dexie) 
      //1.1.1 Evento se dispara cuando se crea la ddbb por primera vez. Definición de la estructura de la ddbb como la creación de almacenes de objetos (store). Único lugar donde se puede alterar la estructura de la base de datos
      request.onupgradeneeded = (event: any) => {  //Modificacion para que "event" no de error
        const db = event.target.result;
        // 1.1.1. Se crea un almacén para contener la información
        const objectStore = db.createObjectStore("myTable", { keyPath: "id", autoIncrement: true });
        // Aquí se puede crear un índice para buscar personas por campos, ejemplo: objectStore.createIndex("name", "name", { unique: false });
      };
      //1.1.2. Evento que se dispara cuando la ddbb se abre con éxito
      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve();
      };
      // 1.1.3. Manejar errores si la la ddbb no se abre con éxito
      request.onerror = (event) => {
        reject(new Error("Error al inicializar la base de datos."));
      };
      //* Eventos necesarios para garantizar que la ddbb se inicialice y configure correctamente antes de que intentes realizar operaciones en ella.
    });
  }

  //2. setData(); Almacenamiento de datos en "myTable" 
  async setData(data: tableRegistroInterface): Promise<void> {
    await this.dbReady;
    return new Promise((resolve, reject) => {
      //* 2.0. Comprobamos si hay problemas inicializacion db (si es db =undefined)
      if (!this.db) {
        reject('La base de datos no está inicializada.');
        return;
      }
      // 2.1. Se crea una "transacción" (nativo IndexedDB) de "lectura/escritura" en el almacén de objetos "myTable" y se almacena en variable
      const transaction = this.db?.transaction(["myTable"], "readwrite");
      const objectStore = transaction?.objectStore("myTable");
      //2.1.1. Ver que estoy almacenando realmente en este punto
      console.log('2.Almacenando Datos Nuevo Registro:', data);
      //2.2. Método para agregar los datos, put() en lugar de add() para permitir múltiples registros
        //2.2.1. Para reemplazar add() por put(): const request = objectStore?.add(data)
      const request = objectStore?.put(data as tableRegistroInterface);
      request?.addEventListener('success', () => { //La API IndexedDB es principalmente asíncrona para asegurarse de que se complete antes de continuar
        resolve();
      });
      request?.addEventListener('error', () => {
        reject(new Error('Error al añadir datos'));
      });
    });
  }

  //3.getData(): Obtener todos los registros de "myTable"
  async getData(id: number): Promise<any> {
    await this.dbReady;
    return new Promise((resolve, reject) => {
      //3.repetimos...
      if (!this.db) {
        reject('La base de datos no está inicializada.');
        return;
      }
      const transaction = this.db.transaction(['myTable'], 'readonly');
      const objectStore = transaction.objectStore('myTable');
      //3.2. Método getAll() para recuperar todos los registros de "myTable"
        //3.2.1. const request = objectStore.get(id); 
      const request = objectStore.getAll();
      console.log('4. Mostrando objectStore ', objectStore);
      request.onsuccess = (event: any) => { //La API IndexedDB...
        resolve(request.result);
      };
      request.onerror = (event: any) => {
        reject('Error al obtener datos');
      };
    });
  }
}