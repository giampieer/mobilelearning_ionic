import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LaboratorioProvider} from "../../providers/laboratorio/laboratorio";
import {ListarlaboratorioPage} from "../listarlaboratorio/listarlaboratorio";

/**
 * Generated class for the GrabarlaboratorioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grabarlaboratorio',
  templateUrl: 'grabarlaboratorio.html',
})
export class GrabarlaboratorioPage {

  loader: any;
  laboratorios: any[];
  codigos: any[];
  frmLaboratorio: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: LaboratorioProvider, public loadingCtrl: LoadingController) {
    this.generarCodigo();
    this.frmLaboratorio= formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      estado: ['', Validators.required],

    });
    this.frmLaboratorio.get('codigo').disable();
  }

  generarCodigo() {
    this.http.generarCodigo().then(res => {
        this.codigos = res;
        console.log(this.codigos);
      },
      error => {
        console.log(error);
      });
  }

  public insertarLaboratorio() {
    if (!this.frmLaboratorio.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.insertarLaboratorio_provider(this.frmLaboratorio.get('codigo').value, this.frmLaboratorio.value.nombre, this.frmLaboratorio.value.estado).then(res => {
          this.laboratorios= res;
          console.log(res);
          if (this.laboratorios[0].estado == "Registro Insertado") {
            this.navCtrl.popTo(ListarlaboratorioPage);
          }
          this.loader.dismiss();
        },
        error => {
          console.log(error);
        });
    }
  }

  Carga() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    this.loader.present();
  }
}
