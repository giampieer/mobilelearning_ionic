import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LaboratorioProvider} from "../../providers/laboratorio/laboratorio";
import {ListarlaboratorioPage} from "../listarlaboratorio/listarlaboratorio";

/**
 * Generated class for the ModificarlaboratorioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificarlaboratorio',
  templateUrl: 'modificarlaboratorio.html',
})
export class ModificarlaboratorioPage {

  datos;
  loader: any;
  laboratorios: any[];
  frmlaboratorios: FormGroup;
  submitAttempt: boolean = false;
  estados: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: LaboratorioProvider, public loadingCtrl: LoadingController) {
    this.datos = navParams.data.laboratorios;
    this.estados = [{
      id: 1,
      nombre: "Habilitado"
    }, {
      id: 2,
      nombre: "Deshabilitado"
    }];
    this.frmlaboratorios= formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      estado: ['', Validators.required]

    });
    this.frmlaboratorios.get('codigo').disable();
    this.frmlaboratorios.get('estado').setValue(this.datos.Estado);
  }

  public modificarLaboratorio() {
    if (!this.frmlaboratorios.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.modificarLaboratorio_provider(this.frmlaboratorios.get('codigo').value, this.frmlaboratorios.value.nombre, this.frmlaboratorios.value.estado).then(res => {
          this.laboratorios = res;
          console.log(res);
          if (this.laboratorios[0].estado == "Registro Modificado") {
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
