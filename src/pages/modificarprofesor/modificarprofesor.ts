import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfesorProvider} from "../../providers/profesor/profesor";
import {ListarprofesorPage} from "../listarprofesor/listarprofesor";

/**
 * Generated class for the ModificarprofesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificarprofesor',
  templateUrl: 'modificarprofesor.html',
})
export class ModificarprofesorPage {
  datos;
profesores:any[];
sexos:any[];

frmprofesor:FormGroup;
loader:any;
submit:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder,public http:ProfesorProvider, public loading:LoadingController) {
  this.datos=navParams.data.profesores;
  this.sexos=[{
    id:1,
    nombre:'Masculino'
    },
    {id:2,
      nombre:'Femenino'

    }

  ];

    this.frmprofesor = formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      correo: ['', Validators.required],
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
    this.frmprofesor.get('codigo').disable();
    this.frmprofesor.get('sexo').setValue(this.datos.Sexo);

  }

  public modificarProfesor() {
    if (!this.frmprofesor.valid) {
      this.submit = true;
    } else {
      this.Carga();
      this.http.modificarProfesorprovider(this.frmprofesor.get('codigo').value, this.frmprofesor.value.nombre, this.frmprofesor.value.apellido, this.frmprofesor.value.sexo, this.frmprofesor.value.edad, this.frmprofesor.value.correo, this.frmprofesor.value.usuario, this.frmprofesor.value.clave).then(res => {
          this.profesores = res;
          console.log(res);
          if (this.profesores[0].estado == "Registro Modificado") {
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
    this.loader = this.loading.create({
      content: "Cargando..."
    });
    this.loader.present();
  }

}
