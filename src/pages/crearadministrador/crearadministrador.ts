import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdministradorProvider} from '../../providers/administrador/administrador';
import {ListaradministradorPage} from "../listaradministrador/listaradministrador";

/**
 * Generated class for the CrearadministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crearadministrador',
  templateUrl: 'crearadministrador.html',
})
export class CrearadministradorPage {
  loader: any;
  administradores: any[];
  codigos: any[];
  frmAdministrador: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: AdministradorProvider, public loadingCtrl: LoadingController) {
    this.generarCodigo();
    this.frmAdministrador = formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      correo: ['', Validators.required],
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
    this.frmAdministrador.get('codigo').disable();
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

  public insertarAdministrador() {
    if (!this.frmAdministrador.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.insertarAdministrador(this.frmAdministrador.get('codigo').value, this.frmAdministrador.value.nombre, this.frmAdministrador.value.apellido, this.frmAdministrador.value.sexo, this.frmAdministrador.value.edad, this.frmAdministrador.value.correo, this.frmAdministrador.value.usuario, this.frmAdministrador.value.clave).then(res => {
          this.administradores = res;
          console.log(res);
          if (this.administradores[0].estado == "Registro Insertado") {
            this.navCtrl.popTo(ListaradministradorPage);
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
