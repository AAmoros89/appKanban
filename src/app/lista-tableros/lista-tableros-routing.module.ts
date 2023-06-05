import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTablerosComponent } from './lista-tableros/lista-tableros.component';

const routes: Routes = [
  {
    path: '',
    component: ListaTablerosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaTablerosRoutingModule { }
