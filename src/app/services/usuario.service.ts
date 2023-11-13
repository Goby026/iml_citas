import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, map } from 'rxjs';

import { apiUrl } from '../common/global-constants';
const API_URL = apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get(`${API_URL}/users`).pipe(
      map( (res: any)=> res.usuarios as Usuario[] )
    );
  }

  saveUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${API_URL}/users/newUser`, usuario);
  }

  updateUsuario(id: number, usuario: Usuario){
    return this.http.patch(`${API_URL}/users/${id}`, usuario);
  }

  updatePassword(id: number, password: any){
    return this.http.patch(`${API_URL}/users/editPassword/${id}`, {
      newPassword: password
    });
  }

  deleteUser(id: number){
    return this.http.delete(`${API_URL}/users/${id}`);
  }
}
