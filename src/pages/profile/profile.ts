import { ShoppingService } from './../../providers/shopping-service/shopping-service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { AuthService } from './../../providers/auth-service/auth-service';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
   name: string;
   country: string;
   invitationCount:number = 0;
   myListCount: number = 0;
   sharedCount: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthService,public shoppingService:ShoppingService, public toastCtrl:ToastController) {
  
  }

  ionViewDidLoad() {
     // load our shoopingList only if the user already log in - must be this way for authentication
    this.authService.authState.subscribe(user => {
      if (user) {
        // get the name from firebase from node userPofiles
        this.authService.getUserData().subscribe(data => {
            this.name = data.name;
            this.country = data.country;
            
        });
        this.shoppingService.getUserInvitations().subscribe(data =>{
            this.invitationCount = data.length;
        });
        this.shoppingService.getUserList().subscribe(data =>{
          this.myListCount = data.length;
        })
         this.shoppingService.getSharedLists().subscribe(data =>{
          this.sharedCount = data.length;
        })
      }
    
      });
  }



  
}
