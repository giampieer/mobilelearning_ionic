import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EstudianteProvider} from "../../providers/estudiante/estudiante";
import {ListarestudiantePage} from "../listarestudiante/listarestudiante";

/**
 * Generated class for the ModificarestudiantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificarestudiante',
  templateUrl: 'modificarestudiante.html',
})
export class ModificarestudiantePage {
  datos;
  loader: any;
  estudiantes: any[];
  frmEstudiante: FormGroup;
  submitAttempt: boolean = false;
  sexos: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: EstudianteProvider, public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.datos = navParams.data.estudiantes;
    this.sexos = [{
      id: 1,
      nombre: "Masculino"
    }, {
      id: 2,
      nombre: "Femenino"
    }];
    this.frmEstudiante = formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      correo: ['', Validators.required],
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
    this.frmEstudiante.get('codigo').disable();
    this.frmEstudiante.get('sexo').setValue(this.datos.Sexo);
  }

  public modificarEstudiante() {
    if (!this.frmEstudiante.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.modificarEstudiante(this.frmEstudiante.get('codigo').value, this.frmEstudiante.value.nombre, this.frmEstudiante.value.apellido, this.frmEstudiante.value.sexo, this.frmEstudiante.value.edad, this.frmEstudiante.value.correo, this.frmEstudiante.value.usuario, this.frmEstudiante.value.clave).then(res => {
          this.estudiantes = res;
          console.log(res);
          if (this.estudiantes[0].estado == "Registro Modificado") {
            this.navCtrl.popTo(ListarestudiantePage);
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
