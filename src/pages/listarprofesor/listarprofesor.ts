import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ProfesorProvider} from "../../providers/profesor/profesor";
import {GrabarprofesorPage} from "../grabarprofesor/grabarprofesor";
import {ModificarprofesorPage} from "../modificarprofesor/modificarprofesor";

/**
 * Generated class for the ListarprofesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listarprofesor',
  templateUrl: 'listarprofesor.html',
})
export class ListarprofesorPage {
  profesores:any[];
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public http: ProfesorProvider, public loadingCtrl: LoadingController) {
  this.cargarProfesor();
  }



  cargarProfesor() {
    this.Carga();
    this.http.cargarProfesorprovier().then(res => {
        this.profesores = res;
        this.loader.dismiss();
        console.log(this.profesores);
      },
      error => {
        console.log(error);
      });
  }

  insertarProfesor() {
    this.navCtrl.push(GrabarprofesorPage);
  }

  actualizarProfesor(profesores) {
    this.navCtrl.push(ModificarprofesorPage, {profesores: profesores});
  }

  eliminarProfesor(codigo: number) {
    this.Carga();
    this.http.eliminarProfesorproviderd(codigo).then(res => {
        this.profesores = res;
        console.log(res);
        this.loader.dismiss();
        this.cargarProfesor();
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
