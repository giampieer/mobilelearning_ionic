import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LaboratorioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LaboratorioProvider {
  datos: any;
  path: string = 'http://localhost:8084/CampusFramework_Original/LaboratorioServlet';

  constructor(public http: Http) {
    console.log('Hello AdministradorProvider Provider');
  }

  cargarLaboratorio_provider() {
    return this.http
      .get(this.path + '?op=1'
      )
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

  insertarLaboratorio_provider(codigo, nombre, apellido) {
    return this.http
      .get(this.path + '?op=2&txtcod=' + codigo + '&txtnom=' + nombre + '&txtest=' + apellido )
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  modificarLaboratorio_provider(codigo, nombre, apellido) {
    return this.http
      .get(this.path + '?op=3&txtcod=' + codigo + '&txtnom=' + nombre + '&txtest=' + apellido )
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  eliminarLaboratorio_provider(codigo){
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
