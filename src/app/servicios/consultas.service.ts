import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'
import { Router } from '@angular/router';
import { AnotacionesRequest } from '../interfaces/anotaciones_request';
@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  constructor
  (
    private http: HttpClient,
    private router: Router
  ) { 
      if(localStorage.getItem('tokenAnotaciones')!=null)
      {

      }else
      {
        this.pedirToken(environment.correo, environment.password).subscribe(
          {
            next:data=>
            {
              localStorage.setItem('tokenAnotaciones', data.token);
            },
            error:error=>
            {
              return this.router.navigate(['/error']).then(() => window.location.reload());
            }
          });
      }
  }
  pedirToken(correo:any, password:any):Observable<any>
  {
    return this.http.post(environment.api+"login", 
    {
      correo:correo, 
      password:password
    },
    {}
    );
  }
  getDatos():Observable<any>
  {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('tokenAnotaciones'));
    return this.http.get(environment.api+'anotaciones', {headers:headers});
  }
  addDatos(modelo: AnotacionesRequest): Observable<any>
  {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('tokenAnotaciones'));
    return this.http.post(environment.api + 'anotaciones', modelo, { headers: headers });
  }
  deleteDatos(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('tokenAnotaciones'));
    return this.http.delete(environment.api + 'anotaciones/' + id, { headers: headers });
  }

}
