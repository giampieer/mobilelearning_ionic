import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CursoProvider} from "../../providers/curso/curso";
import {ListarcursoPage} from "../listarcurso/listarcurso";

/**
 * Generated class for the ModificarcursoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificarcurso',
  templateUrl: 'modificarcurso.html',
})
export class ModificarcursoPage {
  datos;
  loader: any;
  cursos: any[];
  frmCursos: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: CursoProvider, public loadingCtrl: LoadingController) {
    this.datos = navParams.data.cursos;
    this.frmCursos = formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],

    });

    this.frmCursos.get('codigo').disable();
  }

  public modificarCursos() {
    if (!this.frmCursos.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.modificarCurso_provider(this.frmCursos.get('codigo').value, this.frmCursos.value.nombre).then(res => {
          this.cursos = res;
          console.log(res);
          if (this.cursos[0].estado == "Registro Modificado") {
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
