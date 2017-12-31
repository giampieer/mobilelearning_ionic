import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the EstudianteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EstudianteProvider {
  path: string = 'http://localhost:8084/CampusFramework_Original/AlumnoServlet';

  constructor(public http: Http) {
    console.log('Hello AdministradorProvider Provider');
  }

  cargarEstudiante() {
    return this.http
      .get(this.path + '?op=2')
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  generarCodigo(){
    return this.http
      .get(this.path + '?op=6')
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  insertarEstudiante(codigo, nombre, apellido, sexo, edad, correo, usuario, clave) {
    return this.http
      .get(this.path + '?op=3&txtcod=' + codigo + '&txtnom=' + nombre + '&txtape=' + apellido + '&txtsex=' + sexo
        + '&txteda=' + edad + '&txtcor=' + correo + '&txtid=' + usuario + '&txtpass=' + clave)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  modificarEstudiante(codigo, nombre, apellido, sexo, edad, correo, usuario, clave) {
    return this.http
      .get(this.path + '?op=4&txtcod=' + codigo + '&txtnom=' + nombre + '&txtape=' + apellido + '&txtsex=' + sexo
        + '&txteda=' + edad + '&txtcor=' + correo + '&txtid=' + usuario + '&txtpass=' + clave)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  eliminarEstudiante(codigo){
    return this.http
      .get(this.path+'?op=5&cod=' + codigo)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }
}
