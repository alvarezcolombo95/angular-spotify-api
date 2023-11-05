/*ESTE SERVICIO ES PARA ENVIAR INFORMACION ENTRE SEARCHBOX Y SEARCH RESULT*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchCommService {

  private resultSource = new BehaviorSubject<any>(null)
  currentResult = this.resultSource.asObservable();
  
  constructor() { }

  changeResult(result: string) {
    this.resultSource.next(result)
  }
}
