import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/core/servicios/login.service';
import { ServicioTareaService } from 'src/app/core/servicios/servicio-tarea.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  sesion: any;
  arrayConTareasUrgenteSuyas: any = [];
  arrayConTareasModeradasSuyas: any = [];
  arrayConTareasBajaSuyas: any = [];
  userEmail: string | null = null;

  constructor(private servicioTareas: ServicioTareaService, private loginService: LoginService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Se recoge el correo al iniciar la sesion
    this.userEmail = history.state.userEmail;
    if (this.userEmail === undefined) {
      const user = sessionStorage.getItem("user") ?? "";
      this.sesion = JSON.parse(user);
      this.userEmail = this.sesion.userEmail;
    }

    // Se filtran las tareas segun la proridad y el usuarioAsignado
    this.servicioTareas.getTareas().subscribe(resp => {

      const usuarioAsignadoFiltro = this.userEmail;
      const prioridadFiltro = "urgente";
      const proridadFiltroModerado = "moderada";
      const proridadFiltroBaja = "baja";

      this.arrayConTareasUrgenteSuyas = resp.filter((tarea: any) =>
        tarea.usuarioAsignado === usuarioAsignadoFiltro && tarea.prioridad === prioridadFiltro
      );
      console.log(this.arrayConTareasUrgenteSuyas);

      this.arrayConTareasModeradasSuyas = resp.filter((tarea: any) =>
        tarea.usuarioAsignado === usuarioAsignadoFiltro && tarea.prioridad === proridadFiltroModerado
      );

      this.arrayConTareasBajaSuyas = resp.filter((tarea: any) =>
        tarea.usuarioAsignado === usuarioAsignadoFiltro && tarea.prioridad === proridadFiltroBaja
      );
    })
  }

  /**
   * Metodo que obtiene la sesion del usuario
   * 
   * @returns 
   */
  obtenerUserEnSessionStorage() {
    return sessionStorage.getItem("user");
  }
}
