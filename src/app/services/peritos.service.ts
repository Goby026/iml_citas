import { Injectable, inject } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { HttpClient } from '@angular/common/http';
import { Perito } from '../models/perito';
import { Observable, map } from 'rxjs';


const uri = GlobalConstants.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PeritosService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  getPeritos(): Observable<Perito[]>{
    return this.http.get(`${ uri }/peritos`).pipe(
      map( (res: any)=> res.peritos as Perito[] )
    );
  }

  savePerito( perito: Perito ){
    return this.http.post(`${ uri }/peritos`, perito);
  }

  editPerito( perito: Perito ){
    return this.http.patch(`${ uri }/peritos/${ perito.id }`, perito);
  }

  deletePerito(id: number){
    return this.http.delete(`${ uri }/peritos/${ id }`);
  }
}
