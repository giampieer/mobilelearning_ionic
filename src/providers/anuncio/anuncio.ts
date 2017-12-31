import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


/*
  Generated class for the AnuncioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnuncioProvider {
  path: string = 'http://localhost:8084/CampusFramework_Original/AnuncioServlet';

  constructor(public http: Http) {
    console.log('Hello AnuncioProvider Provider');
  }


  cargarAnuncios_provider() {
    return this.http
      .get(this.path + '?op=1')
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }
  cargarCombo_provider(codigo) {
    return this.http
      .get(this.path + '?op=6&cod='+codigo)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  generarCodigoanuncio_provider(){
    return this.http
      .get(this.path + '?op=5')
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  insertarAnuncio_provider(codigo, anuncio, horario) {
    return this.http
      .get(this.path + '?op=2&txtcod=' + codigo + '&txtnom=' + anuncio + '&txthor=' + horario)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  modificarAnuncio_provider(codigo, anuncio, horario) {
    return this.http
      .get(this.path + '?op=3&txtcod=' + codigo + '&txtnom=' + anuncio + '&txthor=' + horario)
      .map(res => res.json(),
        err => {
          console.log(err);
        }
      )
      .toPromise();
  }

  eliminarAnuncio_provider(codigo){
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
