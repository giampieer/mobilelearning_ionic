import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LibroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LibroProvider {
  datos: any;
  path: string = 'http://localhost:8084/CampusFramework_Original/LibroServlet';

  constructor(public http: Http) {
    console.log('Hello AdministradorProvider Provider');
  }

  cargarLibro_provider() {
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

  insertarLibro_provider(codigo, nombre, autor, ejemplares, estado) {
    return this.http
      .get(this.path + '?op=2&txtcod=' + codigo + '&txtnom=' + nombre + '&txtaut=' + autor + '&txteje=' + ejemplares
        + '&txtest=' + estado)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  modificarLibro_provider(codigo, nombre, autor, ejemplares, estado) {
    return this.http
      .get(this.path + '?op=3&txtcod=' + codigo + '&txtnom=' + nombre + '&txtaut=' + autor + '&txteje=' + ejemplares
        + '&txtest=' + estado)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  EliminarLibro_provider(codigo){
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
