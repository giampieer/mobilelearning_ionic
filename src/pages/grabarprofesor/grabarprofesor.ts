import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfesorProvider} from "../../providers/profesor/profesor";
import {ListarprofesorPage} from "../listarprofesor/listarprofesor";

/**
 * Generated class for the GrabarprofesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grabarprofesor',
  templateUrl: 'grabarprofesor.html',
})
export class GrabarprofesorPage {

  loader: any;
  profesores: any[];
  codigos: any[];
  frmprofesores: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: ProfesorProvider, public loadingCtrl: LoadingController) {
    this.generarCodigoprofesor();
    this.frmprofesores = formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      correo: ['', Validators.required],
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
    //this.frmAdministrador.get('codigo').disable();
  }

  generarCodigoprofesor() {
    this.http.generarCodigoProfesorprovider().then(res => {
        this.codigos = res;
        console.log(this.codigos);
      },
      error => {
        console.log(error);
      });
  }

  public insertarProfesor() {
    if (!this.frmprofesores.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.insertarProfesorprovider(this.frmprofesores.get('codigo').value, this.frmprofesores.value.nombre, this.frmprofesores.value.apellido, this.frmprofesores.value.sexo, this.frmprofesores.value.edad, this.frmprofesores.value.correo, this.frmprofesores.value.usuario, this.frmprofesores.value.clave).then(res => {
          this.profesores = res;
          console.log(res);
          if (this.profesores[0].estado == "Registro Insertado") {
            this.navCtrl.popTo(ListarprofesorPage);
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
