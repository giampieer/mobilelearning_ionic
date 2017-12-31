import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LaboratorioProvider} from "../../providers/laboratorio/laboratorio";
import {GrabarlaboratorioPage} from "../grabarlaboratorio/grabarlaboratorio";
import {ModificarlaboratorioPage} from "../modificarlaboratorio/modificarlaboratorio";

/**
 * Generated class for the ListarlaboratorioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listarlaboratorio',
  templateUrl: 'listarlaboratorio.html',
})
export class ListarlaboratorioPage {

  laboratorios: any[];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: LaboratorioProvider, public loadingCtrl: LoadingController) {
    this.cargaraboratorio();
  }

  cargaraboratorio() {
    this.Carga();
    this.http.cargarLaboratorio_provider().then(res => {
        this.laboratorios = res;
        this.loader.dismiss();
        console.log(this.laboratorios);
      },
      error => {
        console.log(error);
      });
  }

  insertarLaboratorio() {
    this.navCtrl.push(GrabarlaboratorioPage);
  }

  actualizarPage(laboratorio) {
    this.navCtrl.push(ModificarlaboratorioPage, {laboratorios: laboratorio});
  }

  eliminarLaboratorio(codigo: number) {
    this.Carga();
    this.http.eliminarLaboratorio_provider(codigo).then(res => {
        this.laboratorios = res;
        console.log(res);
        this.loader.dismiss();
        this.cargaraboratorio();
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
