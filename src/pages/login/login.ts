import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LoginProvider} from '../../providers/login/login';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ListarprofesorPage} from "../listarprofesor/listarprofesor";
import {ListarcursoPageModule} from "../listarcurso/listarcurso.module";
import {ListarcursoPage} from "../listarcurso/listarcurso";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loader: any;
  login: any[];
  frmLogin: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: LoginProvider, public loadingCtrl: LoadingController) {
    this.frmLogin = formBuilder.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  validarAcceso() {
    if (!this.frmLogin.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.validarAcceso(this.frmLogin.value.usuario, this.frmLogin.value.clave).then(res => {
        this.login = res;
        console.log(res);
        if (this.login[0].estado == "1") {
          this.navCtrl.push(ListarcursoPage   );
        }
        this.loader.dismiss();
      })
    }
  }

  Carga() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    this.loader.present();
  }

}
