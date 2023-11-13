import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Perito } from '../models/perito';
import { Observable, map } from 'rxjs';
import { apiUrl } from '../common/global-constants';
const API_URL = apiUrl;


@Injectable({
  providedIn: 'root'
})
export class PeritosService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  getPeritos(): Observable<Perito[]>{
    return this.http.get(`${ API_URL }/peritos`).pipe(
      map( (res: any)=> res.peritos as Perito[] )
    );
  }

  savePerito( perito: Perito ){
    return this.http.post(`${ API_URL }/peritos`, perito);
  }

  editPerito( perito: Perito ){
    return this.http.patch(`${ API_URL }/peritos/${ perito.id }`, perito);
  }

  deletePerito(id: number){
    return this.http.delete(`${ API_URL }/peritos/${ id }`);
  }
}
