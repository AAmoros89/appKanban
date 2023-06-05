import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth:Auth) { }

  registro({email, password}:any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({email,password}:any){
    return signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
    return userCredential.user?.email;
     });
  }

  logOut(){
    return signOut(this.auth);
  } 
}
