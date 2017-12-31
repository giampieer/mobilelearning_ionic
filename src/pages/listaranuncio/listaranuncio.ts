import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AnuncioProvider} from "../../providers/anuncio/anuncio";
import {ModificaranuncioPage} from "../modificaranuncio/modificaranuncio";
import {GrabaranuncioPage} from "../grabaranuncio/grabaranuncio";

/**
 * Generated class for the ListaranuncioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listaranuncio',
  templateUrl: 'listaranuncio.html',
})
export class ListaranuncioPage {

  anuncios: any[];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: AnuncioProvider, public loadingCtrl: LoadingController) {
    this.cargarAnuncios();
  }
  insertarAnuncio(anuncios) {
    this.navCtrl.push(GrabaranuncioPage,{anuncios:anuncios});
  }

  cargarAnuncios() {
    this.Carga();
    this.http.cargarAnuncios_provider().then(res => {
        this.anuncios = res;
        this.loader.dismiss();
        console.log(this.anuncios);
      },
      error => {
        console.log(error);
      });
  }

  actualizarPage(anuncios) {
    this.navCtrl.push(ModificaranuncioPage, {anuncios: anuncios});
  }

  eliminarAnuncio(codigo: number) {
    this.Carga();
    this.http.eliminarAnuncio_provider(codigo).then(res => {
        this.anuncios = res;
        console.log(res);
        this.loader.dismiss();
        this.cargarAnuncios();
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
