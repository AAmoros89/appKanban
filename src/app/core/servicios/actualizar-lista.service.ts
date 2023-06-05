import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualizarListaService {

  private _isUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUpdate$ = this._isUpdate.asObservable();

  actualizar(isUpdate: boolean) {
    this._isUpdate.next(isUpdate);
  }

  constructor() { }
}
