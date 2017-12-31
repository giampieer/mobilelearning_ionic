import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {CursoProvider} from "../../providers/curso/curso";
import {ModificarcursoPage} from "../modificarcurso/modificarcurso";
import {GrabarcursoPage} from "../grabarcurso/grabarcurso";

/**
 * Generated class for the ListarcursoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listarcurso',
  templateUrl: 'listarcurso.html',
})
export class ListarcursoPage {
  cursos: any[];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: CursoProvider, public loadingCtrl: LoadingController) {
    this.cargarCursos();
  }
  insertarCurso(anuncios) {
    this.navCtrl.push(GrabarcursoPage,{anuncios:anuncios});
  }

  cargarCursos() {
    this.Carga();
    this.http.cargarCurso_provider().then(res => {
        this.cursos = res;
        this.loader.dismiss();
        console.log(this.cursos);
      },
      error => {
        console.log(error);
      });
  }


  actualizarPage(cursos) {
    this.navCtrl.push(ModificarcursoPage, {cursos: cursos});
  }

  eliminarCurso(codigo: number) {
    this.Carga();
    this.http.eliminarCurso_provider(codigo).then(res => {
        this.cursos = res;
        console.log(res);
        this.loader.dismiss();
        this.cargarCursos();
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
