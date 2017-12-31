import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarlibroPage } from './listarlibro';

@NgModule({
  declarations: [
    ListarlibroPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarlibroPage),
  ],
})
export class ListarlibroPageModule {}
