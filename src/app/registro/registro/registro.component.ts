import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  email: string;
  password: string;

  login: any = {
    email: '',
    password: ''
   }
   emailValido = false; // Variable booleana para comprobar que es un correo.

   constructor(private loginService: LoginService,private router:Router, private snackBar: MatSnackBar) {}

  /**
   * Metodo que registra a un usuario en la aplicacion, introduciendo el correo
   * y la contraseña y lo guarda en Firebase llamando al servicio de login.
   * 
   * @returns 
   */
  registro() {
    this.login.email = this.email;
    this.login.password = this.password;

    //expresión regular que comprueba si es un correo
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(this.email)) {
      this.emailValido = true;
      return;
    } else {
      this.emailValido = false;
    }
    this.loginService.registro(this.login)
      .then(response => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.snackBar.open('La contraseña debe tener como mínimo 6 caracteres.', 'Cerrar', {
          duration: 6000, // Duración en milisegundos que se mostrará la alerta
          verticalPosition: 'top' // Posición vertical de la alerta
        });
      });
  }
  
  /**
   * Metodo que redirige al formulario de login
   */
  volver() {
    this.router.navigate(['/login']);
  }
}
