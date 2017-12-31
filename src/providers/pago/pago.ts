import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PagoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PagoProvider {
  path: string = 'http://localhost:8084/CampusFramework_Original/PagosServlet';

  constructor(public http: Http) {
    console.log('Hello PagoProvider Provider');
  }

  cargarPagos() {
    return this.http
      .get(this.path + '?op=1')
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  generarCodigo() {
    return this.http
      .get(this.path + '?op=5')
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  insertarPagos(codigo, nombre, monto, tipo) {
    return this.http
      .get(this.path + '?op=2&txtcod=' + codigo + '&txtnom=' + nombre + '&txtmon=' + monto + '&txttip=' + tipo)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  modificarPagos(codigo, nombre, monto, tipo) {
    return this.http
      .get(this.path + '?op=3&txtcod=' + codigo + '&txtnom=' + nombre + '&txtmon=' + monto + '&txttip=' + tipo)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  eliminarPagos(codigo) {
    return this.http
      .get(this.path + '?op=4&cod=' + codigo)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

}
