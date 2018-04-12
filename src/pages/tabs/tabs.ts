import { SharedListPage } from './../shared-list/shared-list';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service/auth-service";
// import pages
import { MyShoppingListPage } from './../my-shopping-list/my-shopping-list';
import { AcceptListPage } from './../accept-list/accept-list';
import { ProfilePage } from './../profile/profile';
import { ShoppingService } from './../../providers/shopping-service/shopping-service';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1 = MyShoppingListPage;
  tab2 = AcceptListPage;
  tab3 = ProfilePage;

  invitationCount = 0 ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public shoppingService:ShoppingService) {
  }
  
  ionViewDidLoad() {
    this.shoppingService.authState.subscribe(user => {
      if(user){
        this.shoppingService.getUserInvitations().subscribe(data =>{
            this.invitationCount = data.length;
        });
      }
    })
  }

}
