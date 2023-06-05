import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioColumnaService {

  constructor(private firestore: Firestore) { }

  /**
   * Metodo que agrega una nueva Columna a la base de datos Firebase.
   * 
   * @param columna 
   * @param tablaID 
   * @param posicionSiguienteColumna 
   * @returns 
   */
  agregarColumna(columna: any, tablaID:any, posicionSiguienteColumna:any){
    const columnaRef = collection(this.firestore, 'columna');
    return addDoc(columnaRef, {nombre: columna, tablaID: tablaID, posicion: posicionSiguienteColumna, tareas: []})
  }

  /**
   * Metodo que devuelve la lista de Columnas de la base de datos Firebase.
   * 
   * @returns 
   */
  getColumnas(): Observable<any>{
    const columnaRef = collection(this.firestore, 'columna');
    return collectionData(columnaRef, {idField: 'id'}) as
    Observable<any>;
  }

  /**
   * Metodo que elimina una Columna de la base de datos Firebase dado su ID.
   * 
   * @param columna 
   * @returns 
   */
  eliminarColumna(columna:any){
    const placeDocRef = doc(this.firestore, `columna/${columna.id}`)
    return deleteDoc(placeDocRef);
  }
    
  /**
   * Metodo que actualiza una Columna de la base de datos Firebase dado su ID.
   * 
   * @param columna 
   * @returns 
   */
  actualizarColumna(columna:any){
    const columnaRef = doc(this.firestore, `columna/${columna.id}`);
    return updateDoc(columnaRef, columna)
  }
}
