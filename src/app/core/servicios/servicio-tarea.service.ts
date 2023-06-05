import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioTareaService {

  constructor(private firestore: Firestore) { }

  /**
   * Metodo que agrega una tarea nueva a la base de datos Firebase.
   * 
   * @param tarea 
   * @param tablaID 
   * @param posicionColumnaID 
   * @param posicionSiguienteTarea 
   * @param descripcion 
   * @param usuarioAsignado 
   * @param prioridad 
   * @param fechaCreacion 
   * @param fecha 
   * @param creador 
   * @returns 
   */
  agregarTarea(tarea: any, tablaID: any, posicionColumnaID: any, posicionSiguienteTarea: any, descripcion: string,
    usuarioAsignado: string, prioridad: string, fechaCreacion: Date | string, fecha: Date | string, creador: String) {
    const tareaRef = collection(this.firestore, 'tarea');
    return addDoc(tareaRef, {
      nombre: tarea, tablaID: tablaID, posicionColumnaID: posicionColumnaID,
      posicion: posicionSiguienteTarea, descripcion: descripcion, usuarioAsignado: usuarioAsignado, prioridad: prioridad,
      fechaCreacion: fechaCreacion.toString(), fecha: fecha.toString(), creador: creador
    })
  }

  /**
   * Metodo que devuelve la lista de Tareas de la base de datos Firebase.
   * 
   * @returns 
   */
  getTareas(): Observable<any> {
    const tareaRef = collection(this.firestore, 'tarea');
    return collectionData(tareaRef, { idField: 'id' }) as
      Observable<any>;
  }

  /**
   * Metodo que elimina una Tarea de la base de datos Firebase dado su ID
   * 
   * @param tarea 
   * @returns 
   */
  eliminarTarea(tarea: any) {
    const placeDocRef = doc(this.firestore, `tarea/${tarea.id}`)
    return deleteDoc(placeDocRef);
  }

  /**
   * Metodo que actualiza una Tarea de la base de datos Firebase dado su ID
   * 
   * @param tarea 
   * @returns 
   */
  actualizarTarea(tarea: any) {
    const tareaRef = doc(this.firestore, `tarea/${tarea.id}`);
    return updateDoc(tareaRef, tarea)
  }
}
