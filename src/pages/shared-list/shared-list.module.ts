import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedListPage } from './shared-list';

@NgModule({
  declarations: [
    SharedListPage,
  ],
  imports: [
    IonicPageModule.forChild(SharedListPage),
  ],
})
export class SharedListPageModule {}
