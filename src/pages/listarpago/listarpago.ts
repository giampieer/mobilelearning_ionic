import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {PagoProvider} from "../../providers/pago/pago";
import {CrearpagoPage} from "../crearpago/crearpago";
import {ModificarpagoPage} from "../modificarpago/modificarpago";

/**
 * Generated class for the ListarpagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listarpago',
  templateUrl: 'listarpago.html',
})
export class ListarpagoPage {
  pagos: any[];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: PagoProvider, public loadingCtrl: LoadingController) {
    this.cargarPago();
  }

  cargarPago() {
    this.Carga();
    this.http.cargarPagos().then(res => {
      this.pagos = res;
      this.loader.dismiss();
      console.log(this.pagos);
    }, error => {
      console.log(error);
    });
  }

  insertarPago() {
    this.navCtrl.push(CrearpagoPage);
  }

  actualizarPage(pagos) {
    this.navCtrl.push(ModificarpagoPage, {pagos: pagos});
  }

  eliminarPago(codigo: number){
    this.Carga();
    this.http.eliminarPagos(codigo).then(res => {
      this.pagos = res;
      console.log(res);
      this.loader.dismiss();
      this.cargarPago();
    });
  }

  Carga() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    this.loader.present();
  }

}
