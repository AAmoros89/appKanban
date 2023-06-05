import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicioTableroService } from 'src/app/core/servicios/servicio-tablero.service';

@Component({
  selector: 'app-crear-tablero',
  templateUrl: './crear-tablero.component.html',
  styleUrls: ['./crear-tablero.component.scss']
})
export class CrearTableroComponent {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CrearTableroComponent>, private fb: FormBuilder, private servicioTablero: ServicioTableroService){
    this.form = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', Validators.required],
      usuarioAsignado: ['']
    });
  }

  onSubmit(): void {

    // Se coge el correo del usuario que ha iniciado sesion.
    const user = JSON.parse(sessionStorage.getItem("user") ?? "");
  
    if(this.form.valid){
      let emails;
      let nuevoEmail;
      let emailsActualizados;
      
    if(this.form.value.usuarioAsignado.length > 0){
      // String original con los correos electrónicos
      emails = this.form.value.usuarioAsignado;

      // Nuevo correo electrónico a añadir
      nuevoEmail = user.userEmail;

      // Concatenar el nuevo correo electrónico al string existente
      emailsActualizados = emails.concat(", ", nuevoEmail);
    } else {
      emailsActualizados = user.userEmail;
    }
      this.servicioTablero.agregarTablero(this.form.value.name, this.form.value.descripcion, emailsActualizados).then(resp => {
        this.dialogRef.close();
      })
    }
  }

  /**
   * Metodo que cierra el formulario Modal.
   */
  cerrarFormulario() {
    this.dialogRef.close();
  }

}
