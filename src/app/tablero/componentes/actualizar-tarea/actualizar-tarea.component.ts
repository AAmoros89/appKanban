import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ActualizarListaService } from 'src/app/core/servicios/actualizar-lista.service';
import { ServicioTareaService } from 'src/app/core/servicios/servicio-tarea.service';


@Component({
  selector: 'app-actualizar-tarea',
  templateUrl: './actualizar-tarea.component.html',
  styleUrls: ['./actualizar-tarea.component.scss']
})
export class ActualizarTareaComponent {

  form: FormGroup;

  @Input() tarea: string;

  /**
   * Constructor del componente ActualizarTarea donde se inicializa el formulario que agrega Tareas.
   * 
   * @param data 
   * @param fb 
   * @param servicioTarea 
   * @param actualizarLista 
   * @param dialogRef 
   * @param route 
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private servicioTarea: ServicioTareaService,
   private actualizarLista: ActualizarListaService, private dialogRef: MatDialogRef<ActualizarTareaComponent>, 
   private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      nombre: [this.data.tarea.nombre,Validators.required],
      descripcion: [this.data.tarea.descripcion,Validators.required],
      usuarioAsignado: [this.data.tarea.usuarioAsignado,Validators.required],
      prioridad: [this.data.tarea.prioridad,Validators.required],
      fecha:[this.data.tarea.fecha,Validators.required],
    });
  }

  ngOnInit(): void {

  }

  /**
   * Formulario Modal para agregar o actualizar una tarea. La distincion
   * la realiza en funcion de su ID.
   */
  onSubmit(): void {
    // Se guarda la sesion del usuario
    const user = sessionStorage.getItem("user") || '';
    const login = JSON.parse(user);
    const userEmail = login.userEmail;

    if (this.form.valid) {

      if (this.data.tarea.id) {
        const tareaId = this.data.tarea.id;
        const tarea = { ...this.form.value, id: tareaId, creador: userEmail };
        this.servicioTarea.actualizarTarea(tarea);
        this.actualizarLista.actualizar(true);
        this.dialogRef.close();
      } else {
        const tarea = { ...this.form.value, creador: userEmail };
        tarea.posicionColumnaID = this.data.tarea.posicionColumnaID;

        this.servicioTarea.agregarTarea(tarea.nombre, this.data.idTabla, this.data.tarea.posicionColumnaID, 0, tarea.descripcion,
          tarea.usuarioAsignado, tarea.prioridad, new Date(), tarea.fecha, tarea.creador)
        this.actualizarLista.actualizar(true);
        this.dialogRef.close();
      }
    }else {
      this.snackBar.open('El formulario no es válido. Por favor, verifica que los datos introducidos son correctos.', 'Cerrar', {
        duration: 6000, // Duración en milisegundos que se mostrará la alerta
        verticalPosition: 'top' // Posición vertical de la alerta
      });
    }
  }

  /**
   * Metodo que cierra el formulario Modal al pulsar sobre el boton Cerrar.
   */
  cerrarFormulario() {
    this.dialogRef.close();
  }
}
