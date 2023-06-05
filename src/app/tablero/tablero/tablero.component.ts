import { Component } from '@angular/core';
import { Columna } from 'src/app/core/modelos/columna';
import { Tarea } from 'src/app/core/modelos/tarea';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Subscription, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActualizarListaService } from 'src/app/core/servicios/actualizar-lista.service';
import { ServicioColumnaService } from 'src/app/core/servicios/servicio-columna.service';
import { ServicioTareaService } from 'src/app/core/servicios/servicio-tarea.service';

const valorInicial = {
  id: '',
  descripcion: '',
  fecha: '',
  prioridad: '',
  nombre:'',
  fechaCreacion:'',
  usuarioAsignado:''
};

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent {

  isUpdate = false;
  private subscription: Subscription;

  lists: Columna[];
  columnas: any;
  task!: Tarea;
  listId: string;
  id: any;
  tareasLoaded = false;
  tareas: any[] = [];

  /**
   * Constructor del componente Tablero donde se recoge el ID del tablero de la barra de direcciones.
   * 
   * @param dialog 
   * @param route 
   * @param actualizarLista 
   * @param serviciocolumnas 
   * @param servicioTareas 
   */
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private actualizarLista: ActualizarListaService, 
    private serviciocolumnas: ServicioColumnaService, private servicioTareas: ServicioTareaService) {
    this.route.params.subscribe(params =>{
      this.id = params['id'];
      this.listId = params['id'];
    })
 
    this.task = valorInicial; // Se inicializa la tarea.

    this.subscription = this.actualizarLista.isUpdate$.subscribe(isUpdate => {
      this.isUpdate = isUpdate;

      // Se llama al metodo que muestra la lista de columnas y tareas.
      this.getDataList();
    });
  }

  isOverlayDisplayed = false;
  readonly overlayOptions: Partial<CdkConnectedOverlay> = {
    hasBackdrop: true,
    positions: [
      { originX: 'start', originY: 'top', overlayX: 'start',  overlayY: 'top'}
    ]
  };

  ngOnInit(): void {}

  /**
   * Metodo que filtra las Columnas segun el ID del Tablero y dentro de cada Columna filtra las tareas
   * que le pertenecen segun la Columna ID.
   * Se utiliza 'take(1)' para que coja solo la primera Columna Valida y no salgan duplicados.
   * 
   * @param eliminar 
   */
  getDataList(eliminar?: boolean): void {

    this.lists = [];

    this.serviciocolumnas.getColumnas().pipe(take(1)).subscribe(resp => {
      this.lists = resp.filter((columna: any) => columna.tablaID === this.id);
      // Se ordenan segun su posicion.
      this.lists.sort((a: any, b: any) => a.posicion - b.posicion);
      // Se recoge por cada Columna la lista de tareas y se guarda en un array.
      this.servicioTareas.getTareas().subscribe(resp => {
        this.lists.forEach((columna: any) => columna.tareas.splice(0, columna.tareas.length));
        resp.forEach((tarea: any) => {
          const columna = this.lists.find((columna: any) => columna.id === tarea.posicionColumnaID);

          if (columna) {
            columna.tareas.push(tarea);
            //se ordena por fecha de finalizacion
            columna.tareas.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date));
          }
        });
      });
      this.tareasLoaded = true;
    });
  }
 
  displayOverlay(event?: Tarea): void {
    this.isOverlayDisplayed = true;
    console.log( this.isOverlayDisplayed);
  }
  
  hideOverlay(): void {
    this.isOverlayDisplayed = false;
  }
}
