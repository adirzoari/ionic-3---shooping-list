import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { ShoppingService } from './../../providers/shopping-service/shopping-service';


/**
 * Generated class for the SharedListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shared-list',
  templateUrl: 'shared-list.html',
})
export class SharedListPage {
 sharedLists: Observable<any[]>;
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public toastCtrl:ToastController, public shoppingService: ShoppingService) {
    }
  
    ionViewDidLoad() {
      this.shoppingService.authState.subscribe(user => {
        if(user) {
          this.sharedLists = this.shoppingService.getSharedLists();
          console.log(this.sharedLists);
      }
    });
  }

   // add item to list shooping
  addItemToList(listId,listName){
     let prompt = this.alertCtrl.create({
      title: 'New item for "' + listName + '"',
      message: 'Enter a new name for your new item',
      inputs: [
        {
          name: 'item',
          placeholder:'Milk'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
        },
        {
          text: 'Add Item',
          handler: data => { // get the data from the alert ctrl -> the email from input
            this.shoppingService.addListItem(listId,data.item).then(data => {
              this.presentToast('New item added!');

            })
            .catch(err => {
            });

          }
        }
      ]
    })
    prompt.present();
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