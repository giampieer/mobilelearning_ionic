import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ActividadProvider} from "../../providers/actividad/actividad";
import {CrearactividadPage} from "../crearactividad/crearactividad";
import {ModificaractividadPage} from "../modificaractividad/modificaractividad";

/**
 * Generated class for the ListaractividadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listaractividad',
  templateUrl: 'listaractividad.html',
})
export class ListaractividadPage {
  actividades: any[];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ActividadProvider, public loadingCtrl: LoadingController) {
    this.cargarActividad();
  }

  cargarActividad() {
    this.Carga();
    this.http.cargarActividad().then(res => {
      this.actividades = res;
      this.loader.dismiss();
      console.log(this.actividades);
    }, error => {
      console.log(error);
    });
  }

  insertarActividad(){
    this.navCtrl.push(CrearactividadPage);
  }

  actualizarPage(actividades) {
    this.navCtrl.push(ModificaractividadPage, {actividades: actividades});
  }

  eliminarActividad(codigo: number){
    this.Carga();
    this.http.eliminarActividad(codigo).then(res => {
      this.actividades = res;
      console.log(res);
      this.loader.dismiss();
      this.cargarActividad();
    });
  }

  Carga() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    this.loader.present();
  }

}
