import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import { Usuario } from '../models/usuario';
import { Observable, map } from 'rxjs';

const uri = GlobalConstants.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get(`${uri}/users`).pipe(
      map( (res: any)=> res.usuarios as Usuario[] )
    );
  }

  saveUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${uri}/users/newUser`, usuario);
  }

  updateUsuario(id: number, usuario: Usuario){
    return this.http.patch(`${uri}/users/${id}`, usuario);
  }

  updatePassword(id: number, password: any){
    return this.http.patch(`${uri}/users/editPassword/${id}`, {
      newPassword: password
    });
  }

  deleteUser(id: number){
    return this.http.delete(`${uri}/users/${id}`);
  }
}
