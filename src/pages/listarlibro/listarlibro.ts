import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GrabarlibroPage} from "../grabarlibro/grabarlibro";
import {ModificarlibroPage} from "../modificarlibro/modificarlibro";
import {LibroProvider} from "../../providers/libro/libro";

/**
 * Generated class for the ListarlibroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listarlibro',
  templateUrl: 'listarlibro.html',
})
export class ListarlibroPage {

  libros: any[];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:LibroProvider, public loadingCtrl: LoadingController) {
    this.cargarLibros();
  }

  cargarLibros() {
    this.Carga();
    this.http.cargarLibro_provider().then(res => {
        this.libros = res;
        this.loader.dismiss();
        console.log(this.libros);
      },
      error => {
        console.log(error);
      });
  }

  insertarLibro() {
    this.navCtrl.push(GrabarlibroPage);
  }

  actualizarPage(libros) {
    this.navCtrl.push(ModificarlibroPage, {libros:libros});
  }

  eliminarLibro(codigo: number) {
    this.Carga();
    this.http.EliminarLibro_provider(codigo).then(res => {
        this.libros = res;
        console.log(res);
        this.loader.dismiss();
        this.cargarLibros();
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
