import { ShoppingService } from './../../providers/shopping-service/shopping-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-accept-list',
  templateUrl: 'accept-list.html',
})
export class AcceptListPage {
 
  invitations: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public shoppingService: ShoppingService, public toastCtrl:ToastController) {
    }
  
   
  ionViewDidLoad() {
     // load our shoopingList only if the user already log in - must be this way for authentication
    this.shoppingService.authState.subscribe(user => {
      if (user) {
        this.invitations = this.shoppingService.getUserInvitations();
      }
    })
  }
  

    acceptInvitation(invitation){
    this.shoppingService.acceptInvitation(invitation).then(() =>{
      this.presentToast('Invitation accepted');
        
    })
  }

  discardInvitation(invitationId){
    this.shoppingService.discardInvitation(invitationId);
  }

   // present the toast after create new list
  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}

