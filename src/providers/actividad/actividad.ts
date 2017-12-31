import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ActividadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActividadProvider {
  path: string = 'http://localhost:8084/CampusFramework_Original/ActividadServlet';

  constructor(public http: Http) {
    console.log('Hello ActividadProvider Provider');
  }

  cargarActividad() {
    return this.http
      .get(this.path + '?op=1')
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  generarCodigo(){
    return this.http
      .get(this.path + '?op=5')
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  insertarActividad(codigo, nombre, estado) {
    return this.http
      .get(this.path + '?op=2&txtcod=' + codigo + '&txtnom=' + nombre + '&txtest=' + estado)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  modificarActividad(codigo, nombre, estado) {
    return this.http
      .get(this.path + '?op=3&txtcod=' + codigo + '&txtnom=' + nombre + '&txtest=' + estado)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  eliminarActividad(codigo){
    return this.http
      .get(this.path+'?op=4&cod=' + codigo)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

}
