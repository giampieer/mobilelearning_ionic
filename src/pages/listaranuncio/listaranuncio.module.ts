import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaranuncioPage } from './listaranuncio';

@NgModule({
  declarations: [
    ListaranuncioPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaranuncioPage),
  ],
})
export class ListaranuncioPageModule {}
