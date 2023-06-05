import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTablerosRoutingModule } from './lista-tableros-routing.module';
import { MaterialCdkModule } from '../material-cdk/material-cdk.module';
import { ListaTablerosComponent } from './lista-tableros/lista-tableros.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListaTablerosComponent
  ],
  imports: [
    CommonModule,
    ListaTablerosRoutingModule,
    MaterialCdkModule,
    RouterModule,
  ]
})
export class ListaTablerosModule { }
