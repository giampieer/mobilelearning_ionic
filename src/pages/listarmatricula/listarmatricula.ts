import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {MatriculaProvider} from "../../providers/matricula/matricula";
import {CrearmatriculaPage} from "../crearmatricula/crearmatricula";
import {ModificarmatriculaPage} from "../modificarmatricula/modificarmatricula";

/**
 * Generated class for the ListarmatriculaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listarmatricula',
  templateUrl: 'listarmatricula.html',
})
export class ListarmatriculaPage {
  matriculas: any[];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: MatriculaProvider, public loadingCtrl: LoadingController) {
    this.cargarMatricula();
  }

  cargarMatricula() {
    this.Carga();
    this.http.cargarMatricula().then(res => {
      this.matriculas = res;
      this.loader.dismiss();
      console.log(this.matriculas);
    }, error => {
      console.log(error);
    });
  }

  insertarMatricula() {
    this.navCtrl.push(CrearmatriculaPage);
  }

  actualizarPage(matriculas) {
    this.navCtrl.push(ModificarmatriculaPage, {matriculas: matriculas});
  }

  eliminarMatricula(codigo: number){
    this.Carga();
    this.http.eliminarMatricula(codigo).then(res => {
      this.matriculas = res;
      console.log(res);
      this.loader.dismiss();
      this.cargarMatricula();
    });
  }

  Carga() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    this.loader.present();
  }

}
