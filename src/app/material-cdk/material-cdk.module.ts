import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';

import { OverlayModule } from '@angular/cdk/overlay';
import { TextFieldModule } from '@angular/cdk/text-field';

//CDK
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PortalModule } from '@angular/cdk/portal';

import { MatSnackBarModule } from '@angular/material/snack-bar';

const components = [MatToolbarModule, 
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  DragDropModule,
  OverlayModule,
  TextFieldModule,
  MatDialogModule,
  PortalModule,
  MatCardModule,
  MatSnackBarModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    components
  ],
  exports: components,
})
export class MaterialCdkModule { }
