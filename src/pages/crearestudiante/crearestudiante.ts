import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EstudianteProvider} from "../../providers/estudiante/estudiante";
import {ListarestudiantePage} from "../listarestudiante/listarestudiante";

/**
 * Generated class for the CrearestudiantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crearestudiante',
  templateUrl: 'crearestudiante.html',
})
export class CrearestudiantePage {
  frmEstudiante: FormGroup;
  submitAttempt: boolean = false;
  codigos: any[];
  estudiantes: any[];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: EstudianteProvider, public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.generarCodigo();
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

  insertarEstudiante() {
    if (!this.frmEstudiante.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.insertarEstudiante(this.frmEstudiante.get('codigo').value, this.frmEstudiante.value.nombre, this.frmEstudiante.value.apellido, this.frmEstudiante.value.sexo, this.frmEstudiante.value.edad, this.frmEstudiante.value.correo, this.frmEstudiante.value.usuario, this.frmEstudiante.value.clave).then(res => {
          this.estudiantes = res;
          console.log(res);
          if (this.estudiantes[0].estado == "Registro Insertado") {
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
