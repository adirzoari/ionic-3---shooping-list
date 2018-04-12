import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptListPage } from './accept-list';

@NgModule({
  declarations: [
    AcceptListPage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptListPage),
  ],
})
export class AcceptListPageModule {}
