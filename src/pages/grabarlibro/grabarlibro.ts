import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LibroProvider} from "../../providers/libro/libro";
import {ListarlibroPage} from "../listarlibro/listarlibro";

/**
 * Generated class for the GrabarlibroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grabarlibro',
  templateUrl: 'grabarlibro.html',
})
export class GrabarlibroPage {

  loader: any;
  libros: any[];
  codigos: any[];
  frmlibros: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: LibroProvider, public loadingCtrl: LoadingController) {
    this.generarCodigo();
    this.frmlibros= formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      ejemplar: ['', Validators.required],
      estado: ['', Validators.required],
    });
    this.frmlibros.get('codigo').disable();
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

  public insertarLibro() {
    if (!this.frmlibros.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.insertarLibro_provider(this.frmlibros.get('codigo').value, this.frmlibros.value.nombre, this.frmlibros.value.autor,this.frmlibros.value.ejemplar,this.frmlibros.value.estado).then(res => {
          this.libros= res;
          console.log(res);
          if (this.libros[0].estado == "Registro Insertado") {
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
