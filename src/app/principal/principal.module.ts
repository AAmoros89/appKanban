import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialCdkModule } from "./../material-cdk/material-cdk.module";
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

const declarables = [ HeaderComponent, FooterComponent];
@NgModule({
  declarations: [
    declarables,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialCdkModule,
    RouterModule,
  ],
  exports: declarables,
})
export class PrincipalModule { }
