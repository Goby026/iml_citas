import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = GlobalConstants.apiUrl;
  user_role: string='';

  constructor( private http: HttpClient, private router: Router ) { }  

  getLogin( usuario: Usuario ){
    return this.http.post(`${this.uri}/auth/login`, usuario);
  }

  // validarLogin(){
  //   if(localStorage.getItem('username')){
  //     if (localStorage.getItem('role')  === 'ADMIN_ROLE') {
  //       return true;
  //     }
  //   }else{
  //     console.log('Acceso incorrecto');
  //     this.router.navigate(['/']);
  //   }
  // }

  getRol(){
    return localStorage.getItem('role');
  }
}
