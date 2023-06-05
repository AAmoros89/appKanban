import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableroRoutingModule } from './tablero-routing.module';
import { TableroComponent } from './tablero/tablero.component';
import { CrearColumnaComponent } from './componentes/crear-columna/crear-columna.component';
import { CrearTableroComponent } from './componentes/crear-tablero/crear-tablero.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialCdkModule } from '../material-cdk/material-cdk.module';
import { ListaComponent } from './componentes/lista/lista.component';
import { ActualizarTareaComponent } from './componentes/actualizar-tarea/actualizar-tarea.component';
import { TareaComponent } from './componentes/tarea/tarea.component';

@NgModule({
  declarations: [
    TableroComponent,
    CrearColumnaComponent,
    CrearTableroComponent,
    ListaComponent,
    ActualizarTareaComponent,
    TareaComponent
  ],
  imports: [
    CommonModule,
    TableroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialCdkModule
  ]
})
export class TableroModule { }
