import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ServicioTableroService } from 'src/app/core/servicios/servicio-tablero.service';
import { CrearTableroComponent } from 'src/app/tablero/componentes/crear-tablero/crear-tablero.component';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicioTareaService } from 'src/app/core/servicios/servicio-tarea.service';
import { ActualizarListaService } from 'src/app/core/servicios/actualizar-lista.service';

@Component({
  selector: 'app-lista-tableros',
  templateUrl: './lista-tableros.component.html',
  styleUrls: ['./lista-tableros.component.scss']
})
export class ListaTablerosComponent implements OnInit {

  tablas: any;

  constructor(public dialog: MatDialog, private servicioTablero: ServicioTableroService,
    private snackBar: MatSnackBar, private servicioTareas: ServicioTareaService, private actualizarLista: ActualizarListaService) {

  }

  ngOnInit() {

    this.servicioTablero.getTableros().subscribe(resp => {

      const user = JSON.parse(sessionStorage.getItem("user") ?? "");
      const userEmail = user.userEmail;
      let resultados = resp.filter((objeto: any) => objeto.usuariosAsignados.includes(userEmail));

      this.tablas = resultados;
    })
  }

  /**
   * Método que abre un formulario modal, creado en el componente CrearTablaComponent.
   * Utiliza en servicio MatDialog.
   */
  abrirModal(): void {

    const dialogRef = this.dialog.open(CrearTableroComponent, {
      data: { datoEntrante: 0 }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

  /**
   * Metodo que recoge los datos en un formulario de tipo sweetalert2 y los actualiza llamando al servicioTablero
   * 
   * @param tabla 
   */
  actualizarTabla(tabla: any) {

    Swal.fire({
      title: 'Editar tabla',
      html:
        '<div><label style="font-size: 14px;" for="name">Nombre:</label></div>'+
        '<div><input style="font-size: 14px;" formControlName="name" class="swal2-input" type="text" id="name" value="' + tabla.nombre + '"></div>' +
        '<div><label style="font-size: 14px;" for="descripcion">Descripción:</label></div>'+
        '<div><textarea style="font-size: 14px;" formControlName="descripcion" class="swal2-input" id="descripcion">' + tabla.descripcion + '</textarea></div>' +
        '<div><label style="font-size: 14px;" for="usuarioAsignado">Asignar a:</label></div>'+
        '<div><textarea style="font-size: 14px;" formControlName="usuarioAsignado" class="swal2-input" id="usuarioAsignado" placeholder="ejemplo@gmail.com, siguiente@gmail.com...">' + 
        tabla.usuariosAsignados + '</textarea></div>',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#3085d6',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const nombre = (document.getElementById(
          'name'
        ) as HTMLInputElement).value;
        const descripcion = (document.getElementById(
          'descripcion'
        ) as HTMLInputElement).value;
        const usuariosAsignados = (document.getElementById(
          'usuarioAsignado'
        ) as HTMLInputElement).value;
        const tablaActualizada = {
          ...tabla,
          nombre: nombre,
          descripcion: descripcion,
          usuariosAsignados: usuariosAsignados,
        };
        return this.servicioTablero.actualizarTablero(tablaActualizada);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Se ha editado el Tablero con éxito`,
        });
      }
    });
  }

  /**
   * Metodo que elimina un tablero de la lista de la base de datos.
   * En el caso de que existan tareas pendientes, no se debe eliminar el tablero.
   * 
   * @param tabla 
   */
  eliminarTabla(tabla: any) {

    // Se hace un filtro de tareas dado el id de la tabla.
    this.servicioTareas.getTareas().pipe(take(1)).subscribe(resp => {
      const filteredList = resp.filter((tarea: any) => tarea.tablaID === tabla.id);
      console.log(filteredList);
      if (filteredList.length > 0) {
        Swal.fire({
          title: 'No se puede eliminar.',
          text: "¡Esta tabla tiene tareas pendientes de realizar!",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡ENTENDIDO!'
        }).then((result) => {
 
        })
        // Si no hay tareas se procede a eliminar el tablero.
      } else {
        Swal.fire({
          title: '¿Estás seguro que deseas eliminar este Tablero?',
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
              'El Tablero ha sido eliminado con éxito.',
              'success'
            )
            this.servicioTablero.eliminarTablero(tabla);
            // Se actualiza la lista.
            this.actualizarLista.actualizar(true);
          }
        })
      }
   })
  }

  /**
   * Metodo que muestra una ventana tipo alerta para indicar el numero de usuarios asignados
   * al tablero y los correos.
   * 
   * @param tablaId 
   */
  mostrarAlerta(tablaId: any) {

    this.servicioTablero.getTableroId(tablaId).subscribe(resp => {
      console.log(resp);

      // Obtener la propiedad usuariosAsignados del objeto
      let usuariosAsignados = resp.usuariosAsignados;

      // Dividir la cadena por las comas y espacios para obtener una matriz de correos electrónicos
      let emails = usuariosAsignados.split(", ");

      // Contar la cantidad de correos electrónicos
      let cantidadEmails = emails.length;

      // Imprimir el resultado
      console.log(cantidadEmails);
      this.snackBar.open('Total usuarios: ' + cantidadEmails + ' --> ' + usuariosAsignados, 'Cerrar', {
        duration: 6000, // Duración en milisegundos que se mostrará la alerta
        verticalPosition: 'top' // Posición vertical de la alerta
      });
    })
  }
}
