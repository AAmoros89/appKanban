import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';


const routes: Routes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full',
},

{
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  ...canActivate(()=>redirectUnauthorizedTo(['/login']))
},
{
  path: 'lista',
  loadChildren: () => import('./lista-tableros/lista-tableros.module').then(m => m.ListaTablerosModule),
  ...canActivate(()=>redirectUnauthorizedTo(['/login']))
},
{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
},
{
  path: 'tablero/:id',
  loadChildren: () => import('./tablero/tablero.module').then(m => m.TableroModule),
  ...canActivate(()=>redirectUnauthorizedTo(['/login']))
},
{
  path: 'registro',
  loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
