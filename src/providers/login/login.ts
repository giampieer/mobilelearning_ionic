import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  datos: any;
  path: string = 'http://localhost:8084/CampusFramework_Original/AdministradorServlet';

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

  validarAcceso(usuario, clave) {
    return this.http
      .get(this.path + '?op=1&usuario=' + usuario + '&clave=' + clave)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

}
