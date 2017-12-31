import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarprofesorPage } from './listarprofesor';

@NgModule({
  declarations: [
    ListarprofesorPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarprofesorPage),
  ],
})
export class ListarprofesorPageModule {}
