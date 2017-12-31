import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AdministradorProvider} from '../../providers/administrador/administrador';
import {CrearadministradorPage} from '../crearadministrador/crearadministrador';
import {ModificaradministradorPage} from '../modificaradministrador/modificaradministrador';

/**
 * Generated class for the ListaradministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listaradministrador',
  templateUrl: 'listaradministrador.html',
})
export class ListaradministradorPage {
  administradores: any[];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: AdministradorProvider, public loadingCtrl: LoadingController) {
    this.cargarAdministrador();
  }

  cargarAdministrador() {
    this.Carga();
    this.http.cargarAdministrador().then(res => {
        this.administradores = res;
        this.loader.dismiss();
        console.log(this.administradores);
      },
      error => {
        console.log(error);
      });
  }

  insertarAdministrador() {
    this.navCtrl.push(CrearadministradorPage);
  }

  actualizarPage(administradores) {
    this.navCtrl.push(ModificaradministradorPage, {administradores: administradores});
  }

  eliminarAdministrador(codigo: number) {
    this.Carga();
    this.http.eliminarAdministrador(codigo).then(res => {
        this.administradores = res;
        console.log(res);
        this.loader.dismiss();
        this.cargarAdministrador();
      },
      error => {
        console.log(error);
      });
  }

  Carga() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    this.loader.present();
  }

}
