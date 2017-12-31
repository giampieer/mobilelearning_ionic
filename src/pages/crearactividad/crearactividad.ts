import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ActividadProvider} from "../../providers/actividad/actividad";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ListaractividadPage} from "../listaractividad/listaractividad";

/**
 * Generated class for the CrearactividadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crearactividad',
  templateUrl: 'crearactividad.html',
})
export class CrearactividadPage {
  estados: any[];
  codigos: any[];
  actividades: any[];
  loader: any;
  frmActividad: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ActividadProvider, public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.generarCodigo();
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

  insertarActividad() {
    if (!this.frmActividad.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.insertarActividad(this.frmActividad.get('codigo').value, this.frmActividad.value.nombre, this.frmActividad.value.estado).then(res => {
        this.actividades = res;
        console.log(res);
        if(this.actividades[0].estado == "Registro Insertado"){
          this.navCtrl.popTo(ListaractividadPage);
        }
        this.loader.dismiss();
      }, error => {
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
