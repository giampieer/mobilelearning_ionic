import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MatriculaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MatriculaProvider {
  pathpago: string = 'http://localhost:8084/CampusFramework_Original/PagosServlet';
  pathalumno: string = 'http://localhost:8084/CampusFramework_Original/AlumnoServlet';
  path: string = 'http://localhost:8084/CampusFramework_Original/MatriculaServlet';

  constructor(public http: Http) {
    console.log('Hello MatriculaProvider Provider');
  }

  cargarPago1() {
    return this.http
      .get(this.pathpago + '?op=1')
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  cargarEstudiante() {
    return this.http
      .get(this.pathalumno + '?op=2')
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  cargarMatricula() {
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

  insertarMatricula(codigo, ciclo, seccion, admin, alumno, pago) {
    return this.http
      .get(this.path + '?op=2&txtcod=' + codigo + '&txtcic=' + ciclo + '&txtsec=' + seccion + '&txtadm=' + admin + '&txtalu=' + alumno + '&txtpag=' + pago)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  modificarMatricula(codigo, ciclo, seccion, admin, alumno, pago) {
    return this.http
      .get(this.path + '?op=3&txtcod=' + codigo + '&txtcic=' + ciclo + '&txtsec=' + seccion + '&txtadm=' + admin + '&txtalu=' + alumno + '&txtpag=' + pago)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  eliminarMatricula(codigo) {
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
