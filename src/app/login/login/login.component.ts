import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/servicios/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string;
  password: string;

  user: any = {
   email: '',
   password: ''
  }
  emailValido = false; // Variable booleana para comprobar que es un correo.

  constructor(private loginService: LoginService, private router:Router, private snackBar: MatSnackBar) {}

  /**
   * Metodo que comprueba la autenticacion con Firebase dado el email 
   * y la contraseña
   * 
   * @returns 
   */
  login(){
    const user = {
      email: this.email,
      password: this.password
    };
    //expresión regular que comprueba si es un correo
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if(!regex.test(this.email)){
      this.emailValido = true;
      return;
    } else {
      this.emailValido = false;
    }
    
    this.loginService.login(user)
      .then(response => {
        console.log(response);
        this.guardarEnSessionStorage("user", {userEmail: response});
        //se le pasa al home el parametro del correo
        this.router.navigateByUrl('/home', { state: { userEmail: response } });
      })
      .catch(error => {
        console.log(error);
        this.snackBar.open('Los datos introducidos no son correctos. Por favor, verifica tu email y contraseña.', 'Cerrar', {
          duration: 6000, // Duración en milisegundos que se mostrará la alerta
          verticalPosition: 'top' // Posición vertical de la alerta
        });
      });
  }

  /**
   * Metodo que guarda la sesion del usuario.
   * 
   * @param clave 
   * @param valor 
   */
  guardarEnSessionStorage(clave: string, valor: any) {
    sessionStorage.setItem(clave, JSON.stringify(valor));
  }

  /**
   * Metodo que redirige al formulario de registro
   */
  registro(){

    this.router.navigate(['/registro']);
  }
}
