import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoShoppingListPage } from './photo-shopping-list';

@NgModule({
  declarations: [
    PhotoShoppingListPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoShoppingListPage),
  ],
})
export class PhotoShoppingListPageModule {}
