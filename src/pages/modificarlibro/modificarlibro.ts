import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LibroProvider} from "../../providers/libro/libro";
import {ListarlibroPage} from "../listarlibro/listarlibro";

/**
 * Generated class for the ModificarlibroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificarlibro',
  templateUrl: 'modificarlibro.html',
})
export class ModificarlibroPage {

  datos;
  loader: any;
  libros: any[];
  frmlibros: FormGroup;
  submitAttempt: boolean = false;
  estados: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: LibroProvider, public loadingCtrl: LoadingController) {
    this.datos = navParams.data.libros;
    this.estados = [{
      id: 1,
      nombre: "Habilitado"
    }, {
      id: 2,
      nombre: "Deshabilitado"
    }];
    this.frmlibros= formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      ejemplar: ['', Validators.required],
      estado: ['', Validators.required]

    });
    this.frmlibros.get('codigo').disable();
    this.frmlibros.get('estado').setValue(this.datos.Estado);
  }

  public modificarLibro() {
    if (!this.frmlibros.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.modificarLibro_provider(this.frmlibros.get('codigo').value, this.frmlibros.value.nombre, this.frmlibros.value.autor, this.frmlibros.value.ejemplar, this.frmlibros.value.estado).then(res => {
          this.libros = res;
          console.log(res);
          if (this.libros[0].estado == "Registro Modificado") {
            this.navCtrl.popTo(ListarlibroPage);
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
