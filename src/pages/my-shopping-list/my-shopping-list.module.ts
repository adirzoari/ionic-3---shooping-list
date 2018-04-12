import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyShoppingListPage } from './my-shopping-list';

@NgModule({
  declarations: [
    MyShoppingListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyShoppingListPage),
  ],
})
export class MyShoopingListPageModule {}
