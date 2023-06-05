import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Columna } from 'src/app/core/modelos/columna';
import { Tarea } from 'src/app/core/modelos/tarea';
import { ActualizarListaService } from 'src/app/core/servicios/actualizar-lista.service';
import { ServicioColumnaService } from 'src/app/core/servicios/servicio-columna.service';
import { ServicioTareaService } from 'src/app/core/servicios/servicio-tarea.service';
import Swal from 'sweetalert2';
import { ActualizarTareaComponent } from '../actualizar-tarea/actualizar-tarea.component';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent {

  isOverlayDisplayed: boolean;
  @Output() editTask: EventEmitter<Tarea> = new EventEmitter();
  @Input() task: any;
  @Input() list?: Columna;
  @Input() indice: number;
  constructor(public dialog: MatDialog, public servicioTareas: ServicioTareaService, private servicioColumna: ServicioColumnaService, private actualizarLista: ActualizarListaService) { }

  ngOnInit(): void {}

  /**
   * Metodo que elimina una tarea utilizando el plugin sweetalert2
   * 
   * @param tarea 
   */
  eliminarTarea(tarea: Tarea): void {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar la Tarea?',
      text: "¡No podrás revertir el cambio!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioTareas.eliminarTarea(tarea) // Se llama al servicio para eliminar la Tarea de la base de datos.
          .then(() => {
            Swal.fire(
              'Eliminada!',
              'La Tarea ha sido eliminada.',
              'success'
            )
          })
          .catch((error) => {
            console.error(error);
            Swal.fire(
              'Error!',
              'Ocurrió un error al eliminar la Tarea.',
              'error'
            );
          });
      }
    });
    // Se actualiza la lista.
    this.actualizarLista.actualizar(true);
  }
  
  /**
   * Metodo que abre la ventana Modal del componente Actualizar Tarea.
   * 
   * @param tarea 
   */
  actualizarTarea(tarea:any){
    console.log(tarea);
    this.isOverlayDisplayed = !this.isOverlayDisplayed;
    const dialogRef = this.dialog.open(ActualizarTareaComponent, {
      data: { tarea:  this.task} // Se manda al componente Actualizar Tarea la tarea como datos.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }
}
