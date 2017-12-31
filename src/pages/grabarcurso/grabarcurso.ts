import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CursoProvider} from "../../providers/curso/curso";
import {ListarcursoPage} from "../listarcurso/listarcurso";

/**
 * Generated class for the GrabarcursoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grabarcurso',
  templateUrl: 'grabarcurso.html',
})
export class GrabarcursoPage {
  loader: any;
  cursos: any[];
  codigos: any[];
  frmCursos: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: CursoProvider, public loadingCtrl: LoadingController) {
    this.generarCodigo();
    this.frmCursos = formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],

    });
    this.frmCursos.get('codigo').disable();
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

  public insertarCurso() {
    if (!this.frmCursos.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.CrearCurso_provider(this.frmCursos.get('codigo').value, this.frmCursos.value.nombre).then(res => {
          this.cursos = res;
          console.log(res);
          if (this.cursos[0].estado == "Registro Insertado") {
            this.navCtrl.popTo(ListarcursoPage);
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
