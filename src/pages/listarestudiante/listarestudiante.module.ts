import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarestudiantePage } from './listarestudiante';

@NgModule({
  declarations: [
    ListarestudiantePage,
  ],
  imports: [
    IonicPageModule.forChild(ListarestudiantePage),
  ],
})
export class ListarestudiantePageModule {}
