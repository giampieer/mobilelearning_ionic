import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {EstudianteProvider} from "../../providers/estudiante/estudiante";
import {CrearestudiantePage} from "../crearestudiante/crearestudiante";
import {ModificarestudiantePage} from "../modificarestudiante/modificarestudiante";

/**
 * Generated class for the ListarestudiantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listarestudiante',
  templateUrl: 'listarestudiante.html',
})
export class ListarestudiantePage {
  estudiantes: any[];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: EstudianteProvider, public loadingCtrl: LoadingController) {
    this.cargarEstudiante();
  }

  cargarEstudiante() {
    this.Carga();
    this.http.cargarEstudiante().then(res => {
        this.estudiantes = res;
        this.loader.dismiss();
        console.log(this.estudiantes);
      },
      error => {
        console.log(error);
      });
  }

  insertarEstudiante() {
    this.navCtrl.push(CrearestudiantePage);
  }

  actualizarPage(estudiantes) {
    this.navCtrl.push(ModificarestudiantePage, {estudiantes: estudiantes});
  }

  eliminarEstudiante(codigo: number) {
    this.Carga();
    this.http.eliminarEstudiante(codigo).then(res => {
        this.estudiantes = res;
        console.log(res);
        this.loader.dismiss();
        this.cargarEstudiante();
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
