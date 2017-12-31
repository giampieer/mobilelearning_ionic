import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {ListaradministradorPage} from '../pages/listaradministrador/listaradministrador';
import {CrearadministradorPage} from '../pages/crearadministrador/crearadministrador';
import {ModificaradministradorPage} from '../pages/modificaradministrador/modificaradministrador';
import {ListarestudiantePage} from '../pages/listarestudiante/listarestudiante';
import {CrearestudiantePage} from '../pages/crearestudiante/crearestudiante';
import {ModificarestudiantePage} from '../pages/modificarestudiante/modificarestudiante';
import {ListaractividadPage} from '../pages/listaractividad/listaractividad';
import {CrearactividadPage} from '../pages/crearactividad/crearactividad';
import {ModificaractividadPage} from '../pages/modificaractividad/modificaractividad';
import {ListarpagoPage} from '../pages/listarpago/listarpago';
import {CrearpagoPage} from '../pages/crearpago/crearpago';
import {ModificarpagoPage} from '../pages/modificarpago/modificarpago';
import {ListarmatriculaPage} from '../pages/listarmatricula/listarmatricula';
import {CrearmatriculaPage} from '../pages/crearmatricula/crearmatricula';
import {ModificarmatriculaPage} from '../pages/modificarmatricula/modificarmatricula';
import {ListarprofesorPage} from '../pages/listarprofesor/listarprofesor';
import {GrabarprofesorPage} from '../pages/grabarprofesor/grabarprofesor';
import {ModificarprofesorPage} from '../pages/modificarprofesor/modificarprofesor';
import {ListaranuncioPage} from "../pages/listaranuncio/listaranuncio";
import {GrabaranuncioPage} from "../pages/grabaranuncio/grabaranuncio";
import {ModificaranuncioPage} from "../pages/modificaranuncio/modificaranuncio";
import {ListarcursoPage} from "../pages/listarcurso/listarcurso";
import {GrabarcursoPage} from "../pages/grabarcurso/grabarcurso";
import {ModificarcursoPage} from "../pages/modificarcurso/modificarcurso";
import {ListarlaboratorioPage} from "../pages/listarlaboratorio/listarlaboratorio";
import {GrabarlaboratorioPage} from "../pages/grabarlaboratorio/grabarlaboratorio";
import {ModificarlaboratorioPage} from "../pages/modificarlaboratorio/modificarlaboratorio";
import {ListarlibroPage} from "../pages/listarlibro/listarlibro";
import {ModificarlibroPage} from "../pages/modificarlibro/modificarlibro";
import {GrabarlibroPage} from "../pages/grabarlibro/grabarlibro";
import {AdministradorProvider} from '../providers/administrador/administrador';
import {LoginProvider} from '../providers/login/login';
import {EstudianteProvider} from '../providers/estudiante/estudiante';
import {ActividadProvider} from '../providers/actividad/actividad';
import {PagoProvider} from '../providers/pago/pago';
import {MatriculaProvider} from '../providers/matricula/matricula';
import {ProfesorProvider} from '../providers/profesor/profesor';
import {AnuncioProvider} from '../providers/anuncio/anuncio';
import {CursoProvider} from '../providers/curso/curso';
import {LaboratorioProvider} from '../providers/laboratorio/laboratorio';
import {LibroProvider} from '../providers/libro/libro';
z
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ListaradministradorPage,
    ListarestudiantePage,
    CrearadministradorPage,
    CrearestudiantePage,
    ModificaradministradorPage,
    ModificarestudiantePage,
    ListaractividadPage,
    CrearactividadPage,
    ModificaractividadPage,
    ListarpagoPage,
    CrearpagoPage,
    ModificarpagoPage,
    ListarmatriculaPage,
    CrearmatriculaPage,
    ModificarmatriculaPage,
    ListarprofesorPage,
    ModificarprofesorPage,
    GrabarprofesorPage,
    ListaranuncioPage,
    GrabaranuncioPage,
    ModificaranuncioPage,
    ListarcursoPage,
    GrabarcursoPage,
    ModificarcursoPage,
    GrabarlaboratorioPage,
    ListarlaboratorioPage,
    ModificarlaboratorioPage,
    ListarlibroPage,
    ModificarlibroPage,
    GrabarlibroPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ListaradministradorPage,
    ListarestudiantePage,
    CrearadministradorPage,
    CrearestudiantePage,
    ModificaradministradorPage,
    ModificarestudiantePage,
    ListaractividadPage,
    CrearactividadPage,
    ModificaractividadPage,
    ListarpagoPage,
    CrearpagoPage,
    ModificarpagoPage,
    ListarmatriculaPage,
    CrearmatriculaPage,
    ModificarmatriculaPage,
    ListarprofesorPage,
    ModificarprofesorPage,
    GrabarprofesorPage,
    ListaranuncioPage,
    GrabaranuncioPage,
    ModificaranuncioPage,
    ListarcursoPage,
    GrabarcursoPage,
    ModificarcursoPage,
    GrabarlaboratorioPage,
    ListarlaboratorioPage,
    ModificarlaboratorioPage,
    ListarlibroPage,
    ModificarlibroPage,
    GrabarlibroPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AdministradorProvider,
    LoginProvider,
    EstudianteProvider,
    ActividadProvider,
    PagoProvider,
    MatriculaProvider,
    ProfesorProvider,
    AnuncioProvider,
    CursoProvider,
    LaboratorioProvider,
    LibroProvider
  ]
})
export class AppModule {
}
