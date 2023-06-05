import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicioTableroService {

  constructor(private firestore: Firestore) { }

  /**
   * Metodo que agrega un tablero a la coleccion tablero de la base de datos de Firebase.
   * 
   * @param nombre 
   * @param descripcion 
   * @param usuariosAsignados 
   * @returns 
   */
  agregarTablero(nombre: String, descripcion: String, usuariosAsignados: String){
    const tableroRef = collection(this.firestore, 'tablero');
    return addDoc(tableroRef, {nombre: nombre, descripcion: descripcion, usuariosAsignados: usuariosAsignados})
  }
 
  /**
   * Metood que devuelve la lista de Tableros de la base de datos Firebase.
   * 
   * @returns 
   */
  getTableros(): Observable<any>{
    const tableroRef = collection(this.firestore, 'tablero');
    return collectionData(tableroRef, {idField: 'id'}) as
    Observable<any>;
  }

  /**
   * Metodo que elimina un Tablero de la base de datos Firebase dado su ID.
   * 
   * @param tablero 
   * @returns 
   */
  eliminarTablero(tablero:any){
    const placeDocRef = doc(this.firestore, `tablero/${tablero.id}`)
    return deleteDoc(placeDocRef);
  }
    
  /**
   * Metodo que actualiza un Tablero de la base de datos Firebase dado su ID.
   * 
   * @param tablero 
   * @returns 
   */
  actualizarTablero(tablero:any){
    const tableroRef = doc(this.firestore, `tablero/${tablero.id}`);
    return updateDoc(tableroRef, tablero);
  } 

  /**
   * Metodo que devuelve un Tablero de la base de datos Firebase dado su ID.
   * 
   * @param tableroId 
   * @returns 
   */
  getTableroId(tableroId: string): Observable<any>{
    const tableroDocRef = doc(this.firestore, 'tablero', tableroId);
    return from(getDoc(tableroDocRef)).pipe(
      map(doc => {
        if (doc.exists()) {
          return { id: doc.id, ...doc.data() };
        } else {
          throw new Error('No se encontró la tabla con el ID especificado');
        }
      })
    );
  }
}
