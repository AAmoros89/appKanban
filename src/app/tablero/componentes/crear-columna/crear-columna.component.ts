import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ActualizarListaService } from 'src/app/core/servicios/actualizar-lista.service';
import { ServicioColumnaService } from 'src/app/core/servicios/servicio-columna.service';

@Component({
  selector: 'app-crear-columna',
  templateUrl: './crear-columna.component.html',
  styleUrls: ['./crear-columna.component.scss']
})
export class CrearColumnaComponent implements OnInit{

  formulario: FormGroup;
  cuadroNombre:string="";
  id: any;
  posicionSiguienteColumna: any;
  columnasNEW: any;

  /**
   * Constructor del componente CrearColumnaComponent donde se inicializa el formulario y se inyectan los srvicios.
   * 
   * @param servicioColumnas 
   * @param actualizarLista 
   * @param route 
   * @param fb 
   */
   constructor( private servicioColumnas: ServicioColumnaService, private actualizarLista: ActualizarListaService, private route: ActivatedRoute, private fb: FormBuilder){ 
     this.formulario = this.fb.group({
       nombre: ['', Validators.required] 
     });
   }

   ngOnInit() {
    // Se recoje el ID del tablero de la barra de direcciones.
    this.route.params.subscribe(params =>{
      this.id = params['id'];
    })
  }

  /**
   * Metodo que agrega una columna al tablero
   */
  agregarColumna() {
    // Se hace una llamada al servicio para buscar la posicion de la ultima columna de un tablero dado la ID
    this.servicioColumnas.getColumnas()
      .pipe(take(1))
      .subscribe(resp => {
        this.columnasNEW = resp;
        this.posicionSiguienteColumna = this.buscarPosicionSiguiente(this.id, resp);
  
        // Dado que la solicitud es asincrona se utiliza el metodo addColumna
        this.addColumna(
          this.formulario.controls['nombre'].value,
          this.id,
          this.posicionSiguienteColumna
          
        );
        // Reiniciar el formulario
        this.formulario.reset();
        // se actualiza la lista
        this.actualizarLista.actualizar(true);
      });
    this.cuadroNombre = '';
  }

  /**
   * Metodo que busca la posicion de la ultima columna creada en un tablero y le suma 1.
   * 
   * @param tablaID 
   * @param listaDeObjetos 
   * @returns 
   */
  buscarPosicionSiguiente(tablaID: string, listaDeObjetos: any[]): number {
    const objetosFiltrados = listaDeObjetos.filter((obj: any) => obj.tablaID === tablaID);
    const posicionMaxima = objetosFiltrados.reduce((prev: any, current: any) => 
    (prev.posicion > current.posicion) ? prev : current, { posicion: -1 }).posicion;
    return posicionMaxima + 1;
  }

  /**
   * Metodo asincrono que se utiliza para hacer una peticion al servicio y agregar una columna.
   * 
   * @param cuadroNombre 
   * @param id 
   * @param posicionSiguienteColumna 
   */
  async addColumna(cuadroNombre:any, id:any, posicionSiguienteColumna:any){
    const resp = await this.servicioColumnas.agregarColumna(cuadroNombre, id, posicionSiguienteColumna);
    console.log(resp);
  }
}
