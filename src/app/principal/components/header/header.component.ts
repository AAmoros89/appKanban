import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/servicios/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private loginservice:LoginService, private router:Router){ }
   
  /**
   * Metodo que borra la sesion del usuario
   */
  logOut(){
    this.loginservice.logOut()
    .then(()=>{
      sessionStorage.removeItem("user");
      this.router.navigate(['/login']);
    })

    .catch(error => console.log(error));
  }

}
