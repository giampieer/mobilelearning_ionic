import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnuncioProvider} from "../../providers/anuncio/anuncio";
import {ListaranuncioPage} from "../listaranuncio/listaranuncio";

/**
 * Generated class for the GrabaranuncioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grabaranuncio',
  templateUrl: 'grabaranuncio.html',
})
export class GrabaranuncioPage {
  datos;

  loader: any;
  anuncios: any[];
  codigos: any[];
  combo: any[];
  frmAnuncio: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: AnuncioProvider, public loadingCtrl: LoadingController) {
    this.datos = navParams.data.anuncios  ;
    this.generarCodigo();
    this.cargar_combo();
    this.frmAnuncio = formBuilder.group({
      codigo: ['', Validators.required],
      anuncio: ['', Validators.required],
      horario: ['', Validators.required]

    });
    this.frmAnuncio.get('codigo').disable();
  }

  cargar_combo(){
    this.http.cargarCombo_provider(1).then(res => {
        this.combo = res;
        console.log(this.combo);
      },
      error => {
        console.log(error);
      });
  }

  generarCodigo() {
    this.http.generarCodigoanuncio_provider().then(res => {
        this.codigos = res;
        console.log(this.codigos);
      },
      error => {
        console.log(error);
      });
  }

  public insertarAnuncio() {
    if (!this.frmAnuncio.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.insertarAnuncio_provider(this.frmAnuncio.get('codigo').value,this.frmAnuncio.value.anuncio,this.frmAnuncio.value.horario).then(res => {
          this.anuncios = res;
          console.log(res);
          if (this.anuncios[0].estado == "Registro Insertado") {
            this.navCtrl.popTo(ListaranuncioPage);
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
