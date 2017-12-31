import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ListarmatriculaPage} from "../listarmatricula/listarmatricula";
import {MatriculaProvider} from "../../providers/matricula/matricula";

/**
 * Generated class for the ModificarmatriculaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificarmatricula',
  templateUrl: 'modificarmatricula.html',
})
export class ModificarmatriculaPage {
  datos;
  matriculas: any[];
  secciones: any[];
  codigos: any[];
  alumnos: any[];
  pagos: any[];
  ciclos: any[];
  loader: any;
  frmMatricula: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: MatriculaProvider, public loadingCtrl: LoadingController, public formBuilder: FormBuilder) {
    this.datos = navParams.data.matriculas;
    this.cargarAlumno();
    this.cargarPagos();
    this.ciclos = [{
      id: 'I'
    }, {
      id: 'II'
    }, {
      id: 'III'
    }, {
      id: 'IV'
    }, {
      id: 'V'
    }, {
      id: 'VI'
    }, {
      id: 'VII'
    }, {
      id: 'VIII'
    }, {
      id: 'IX'
    }, {
      id: 'X'
    }];
    this.secciones = [{
      id: 'A'
    }, {
      id: 'B'
    }, {
      id: 'C'
    }, {
      id: 'D'
    }];
    this.frmMatricula = formBuilder.group({
      codigo: ['', Validators.required],
      ciclo: ['', Validators.required],
      seccion: ['', Validators.required],
      administrador: ['', Validators.required],
      alumno: ['', Validators.required],
      pago: ['', Validators.required]
    });
    this.frmMatricula.get('codigo').disable();
    this.frmMatricula.get('administrador').disable();
    this.frmMatricula.get('ciclo').setValue(this.datos.Ciclo);
    this.frmMatricula.get('seccion').setValue(this.datos.Seccion);
    this.frmMatricula.get('alumno').setValue(this.datos.idAlumno);
    this.frmMatricula.get('pago').setValue(this.datos.idPagos);
  }

  cargarAlumno() {
    // this.Carga();
    this.http.cargarEstudiante().then(res => {
      this.alumnos = res;
      // this.loader.dismiss();
      console.log(this.alumnos);
    }, error => {
      console.log(error);
    });
  }

  cargarPagos() {
    // this.Carga();
    this.http.cargarPago1().then(res => {
      this.pagos = res;
      // this.loader.dismiss();
      console.log(this.pagos);
    }, error => {
      console.log(error);
    });
  }

  modificarMatricula() {
    if (!this.frmMatricula.valid) {
      this.submitAttempt = true;
    } else {
      this.Carga();
      this.http.modificarMatricula(this.frmMatricula.get('codigo').value, this.frmMatricula.value.ciclo, this.frmMatricula.value.seccion, this.frmMatricula.get('administrador').value, this.frmMatricula.value.alumno, this.frmMatricula.value.pago).then(res => {
        this.matriculas = res;
        console.log(res);
        if (this.matriculas[0].estado == "Registro Modificado") {
          this.navCtrl.popTo(ListarmatriculaPage);
        }
        this.loader.dismiss();
      }, error => {
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
