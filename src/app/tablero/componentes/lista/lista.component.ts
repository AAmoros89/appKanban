import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Columna } from 'src/app/core/modelos/columna';
import { Tarea } from 'src/app/core/modelos/tarea';
import { ActualizarListaService } from 'src/app/core/servicios/actualizar-lista.service';
import { ServicioTareaService } from 'src/app/core/servicios/servicio-tarea.service';
import Swal from 'sweetalert2'
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { map, take, tap } from 'rxjs';
import { ServicioColumnaService } from 'src/app/core/servicios/servicio-columna.service';
import { ActualizarTareaComponent } from '../actualizar-tarea/actualizar-tarea.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {

  @Input() list: Columna;
  @Input() indice: number;
  @Output() editTask: EventEmitter<Tarea> = new EventEmitter();

  id: any;

  constructor(public dialog: MatDialog, public servicioTareas: ServicioTareaService,
    private servicioColumnas: ServicioColumnaService, private route: ActivatedRoute,
    private actualizarLista: ActualizarListaService
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
  }
  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<any[]>): void {
    /*  const user = JSON.parse(sessionStorage.getItem("user") ?? "");
     const userEmail = user.userEmail; */
    // Necesito saber la tarea que se esta moviendo.
    const tarea = event.previousContainer.data[event.previousIndex];

    // Necesito saber a que columna va
    const siguienteColumna = this.indice;

    this.servicioColumnas.getColumnas().pipe(take(1),
      map(resp => resp.filter((columna: any) => columna.tablaID === this.id)),
      //se ordena por orden de posicion
      tap(columnasFiltradas => columnasFiltradas.sort((a: any, b: any) => a.posicion - b.posicion)),
      //se buscan los ids de la lista de columnas de ese tablero
      map(columnasFiltradas => columnasFiltradas.map((columna: { id: any; }) => columna.id)),
    ).subscribe(columnaIds => {
      //se coge el id de la columna que siguiente a la que va el arrastre
      const idColumnaSiguiente = columnaIds[siguienteColumna];
      // hacer algo con el idColumnaSiguiente
      const user = tarea.creador;
      this.servicioTareas.eliminarTarea(tarea);
      this.servicioTareas.agregarTarea(tarea.nombre, tarea.tablaID, idColumnaSiguiente, this.indice, tarea.descripcion, 
        tarea.usuarioAsignado, tarea.prioridad, tarea.fechaCreacion, tarea.fecha, user);
    });
  }

  handleEdit(task: Tarea) {
    if (this.list) {
      task.listId = this.indice.toString();
      this.editTask.emit(task);
    }
  }

  /**
   * Metodo que utiliza una alerta de tipo sweetalert2 para abrir una ventana y modificar 
   * el nombre de la Columna.
   * 
   * @param lista 
   */
  actualizaColumna(lista: Columna) {
    Swal.fire({
      title: 'Escribe el nuevo nombre de la Columna',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      confirmButtonColor: '#3085d6',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        const updatedList = {
          ...lista,
          nombre: login
        };
        this.servicioColumnas.actualizarColumna(updatedList);
        this.actualizarLista.actualizar(true);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Se ha editado con éxito`,
        })
      }
    })
  }

  /**
   * Metodo que utiliza una alerta de tipo sweetalert2 para eliminar una Columna dado su ID.
   * 
   * @param lista 
   */
  eliminarColumna(lista: any) {

    // La Columna no se puede eliminar si quedan tareas pendientes dentro de esta, por lo tanto
    // se filtran las tareas segun el ID de la Columna.
    this.servicioTareas.getTareas().pipe(take(1)).subscribe(resp => {
      const filteredList = resp.filter((tarea: any) => tarea.posicionColumnaID === lista.id);
      console.log(filteredList);
      if (filteredList.length > 0) {
        Swal.fire({
          title: 'No se puede eliminar.',
          text: "¡Esta columna tiene tareas pendientes de realizar!",
          icon: 'warning',
          /*  showCancelButton: true,
           cancelButtonText: 'Cancelar', */
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡ENTENDIDO!'
        }).then((result) => {
          if (result.isConfirmed) {
            /* Swal.fire(
              'Eliminada!',
              'La Columna ha sido eliminada.',
              'success'
            ) */
          }
        })
        // Si no tiene tareas pendientes, entonces se procede a eliminar.
      } else {
        Swal.fire({
          title: '¿Estás seguro que deseas eliminar una Columna?',
          text: "¡No podrás revertir el cambio!",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Eliminada!',
              'La Columna ha sido eliminada.',
              'success'
            )
            this.servicioColumnas.eliminarColumna(lista);
            this.actualizarLista.actualizar(true);
          }
        })
      }
    })
  }

  /**
   * Metodo que abre la ventana Modal del Componente ActualizarTarea.
   * 
   * @param columna 
   */
  addTareaEnColuma(columna: any) {
    console.log(columna);

    // abrir el modal coger la info
    const tarea = {
      tarea: "",
      tablaID: "",
      posicionColumnaID: columna.id,
      posicionSiguienteTarea: "",
      descripcion: "",
      usuarioAsignado: "",
      prioridad: "",
      fechaCreacion: "",
      fecha: ""
    }
    const dialogRef = this.dialog.open(ActualizarTareaComponent, {
      data: { tarea: tarea, idTabla: this.id } // Se le pasa como datos la tarea y el IDTabla al Componente ActalizarTarea.
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }
}
