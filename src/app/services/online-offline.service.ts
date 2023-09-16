import { Injectable } from '@angular/core';
import { Subject, Observable, fromEvent, merge, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
    //2. Utiliza un "BehaviorSubject" llamado "internalConnectionChanged", objeto que mantiene un registro del estado actual de la conexión
  private internalConnectionChanged = new BehaviorSubject<boolean>(true);

  //0. *Getters; Provee de métodos de acceso (get) para el método "connectionChanged".
  get connectionChanged() {
    //2.1. Seteo "internalConnectionChanged" como observable para que otros componentes se suscriban y reaccionen a cambios en la conexión a Internet
    return this.internalConnectionChanged.asObservable();
  }
    //0.1. *Getters; Provee de métodos de acceso (get) para el estado actual de la conexión
  get isOnline() {
    return !!window.navigator.onLine;
  }

  constructor() {
    //1. eventos (Observables) nativos del navegador
   this.onlineEvent = fromEvent(window, 'online');
   this.offlineEvent = fromEvent(window, 'offline');

    //3. *Merging Events; Utiliza el operador merge (RxJS) para combinar los eventos online y offline en un único flujo de datos (Observable)
   merge(this.onlineEvent, this.offlineEvent).subscribe((res: any) => {
    //3.1. *Subscription and Notification; Actualiza el valor de "internalConnectionChanged" segun el tipo de evento recibido (online/offline).
    const online = res?.type === 'online' ? true : false;
    this.internalConnectionChanged.next(online);
   });
  }
}