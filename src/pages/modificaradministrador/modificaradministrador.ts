import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AdministradorProvider} from '../../providers/administrador/administrador';
import {ListaradministradorPage} from '../listaradministrador/listaradministrador';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the ModificaradministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificaradministrador',
  templateUrl: 'modificaradministrador.html',
})
export class ModificaradministradorPage {
  datos;
  loader: any;
  administradores: any[];
  frmAdministrador: FormGroup;
  submitAttempt: boolean = false;
  sexos: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: AdministradorProvider, public loadingCtrl: LoadingController) {
    this.datos = navParams.data.administradores;
    this.sexos = [{
      id: 1,
      nombre: "Masculino"
    }, {
      id: 2,
      nombre: "Femenino"
    }];
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
    this.frmAdministrador.get('sexo').setValue(this.datos.Sexo);
  }

  public modificarAdministrador() {
    if (!this.frmAdministrador.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.modificarAdministrador(this.frmAdministrador.get('codigo').value, this.frmAdministrador.value.nombre, this.frmAdministrador.value.apellido, this.frmAdministrador.value.sexo, this.frmAdministrador.value.edad, this.frmAdministrador.value.correo, this.frmAdministrador.value.usuario, this.frmAdministrador.value.clave).then(res => {
          this.administradores = res;
          console.log(res);
          if (this.administradores[0].estado == "Registro Modificado") {
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
