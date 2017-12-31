import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PagoProvider} from "../../providers/pago/pago";
import {ListarpagoPage} from "../listarpago/listarpago";

/**
 * Generated class for the ModificarpagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificarpago',
  templateUrl: 'modificarpago.html',
})
export class ModificarpagoPage {
  datos;
  loader: any;
  pagos: any[];
  frmPago: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: PagoProvider, public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.datos = navParams.data.pagos;
    this.frmPago = formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      monto: ['', Validators.required],
      tipo: ['', Validators.required]
    });
    this.frmPago.get('codigo').disable();
  }

  public modificarPago() {
    if (!this.frmPago.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.modificarPagos(this.frmPago.get('codigo').value, this.frmPago.value.nombre, this.frmPago.value.monto, this.frmPago.value.tipo).then(res => {
          this.pagos = res;
          console.log(res);
          if (this.pagos[0].estado == "Registro Modificado") {
            this.navCtrl.popTo(ListarpagoPage);
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
