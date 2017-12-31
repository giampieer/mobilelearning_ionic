import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PagoProvider} from "../../providers/pago/pago";
import {ListarpagoPage} from "../listarpago/listarpago";

/**
 * Generated class for the CrearpagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crearpago',
  templateUrl: 'crearpago.html',
})
export class CrearpagoPage {
  codigos: any[];
  actividades: any[];
  loader: any;
  frmPago: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: PagoProvider, public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.generarCodigo();
    this.frmPago = formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      monto: ['', Validators.required],
      tipo: ['', Validators.required]
    });
    this.frmPago.get('codigo').disable();
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

  insertarPago() {
    if (!this.frmPago.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.insertarPagos(this.frmPago.get('codigo').value, this.frmPago.value.nombre, this.frmPago.value.monto, this.frmPago.value.tipo).then(res => {
        this.actividades = res;
        console.log(res);
        if(this.actividades[0].estado == "Registro Insertado"){
          this.navCtrl.popTo(ListarpagoPage);
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
