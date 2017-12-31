import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActividadProvider} from "../../providers/actividad/actividad";
import {ListaractividadPage} from "../listaractividad/listaractividad";

/**
 * Generated class for the ModificaractividadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificaractividad',
  templateUrl: 'modificaractividad.html',
})
export class ModificaractividadPage {
  datos;
  loader: any;
  actividades: any[];
  frmActividad: FormGroup;
  submitAttempt: boolean = false;
  estados: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ActividadProvider, public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.datos = navParams.data.actividades;
    this.estados = [{
      id: 1,
      nombre: "HABILITADO"
    }, {
      id: 2,
      nombre: "DESHABILITADO"
    }];
    this.frmActividad = formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      estado: ['', Validators.required]
    });
    this.frmActividad.get('codigo').disable();
    this.frmActividad.get('estado').setValue(this.datos.Estado);
  }

  public modificarActividad() {
    if (!this.frmActividad.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.modificarActividad(this.frmActividad.get('codigo').value, this.frmActividad.value.nombre, this.frmActividad.value.estado).then(res => {
          this.actividades = res;
          console.log(res);
          if (this.actividades[0].estado == "Registro Modificado") {
            this.navCtrl.popTo(ListaractividadPage);
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
