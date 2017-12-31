import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnuncioProvider} from "../../providers/anuncio/anuncio";
import {ListaranuncioPage} from "../listaranuncio/listaranuncio";

/**
 * Generated class for the ModificaranuncioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificaranuncio',
  templateUrl: 'modificaranuncio.html',
})
export class ModificaranuncioPage {
  datos;
  loader: any;
  anuncios: any[];
  combo:any[];
  frmAnuncios: FormGroup;
  submitAttempt: boolean = false;
  horarios: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: AnuncioProvider, public loadingCtrl: LoadingController) {
    this.datos = navParams.data.anuncios  ;
    this.cargar_combo();
    this.horarios = [{
      id: 1,
      nombre: "Masculino"
    }, {
      id: 2,
      nombre: "Femenino"
    }];
    this.frmAnuncios = formBuilder.group({
      codigo: ['', Validators.required],
      anuncio: ['', Validators.required],
      horario: ['', Validators.required]

    });
    this.frmAnuncios.get('codigo').disable();
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

  public modificarAnuncio() {
    if (!this.frmAnuncios.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.modificarAnuncio_provider(this.frmAnuncios.get('codigo').value, this.frmAnuncios.value.anuncio, this.frmAnuncios.value.horario).then(res => {
          this.anuncios = res;
          console.log(res);
          if (this.anuncios[0].estado == "Registro Modificado") {
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
