import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

import { apiUrl } from '../common/global-constants';
const API_URL = apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user_role: string='';

  constructor( private http: HttpClient, private router: Router ) { }  

  getLogin( usuario: Usuario ){
    return this.http.post(`${API_URL}/auth/login`, usuario);
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
