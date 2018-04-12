import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ToastController, AlertController,PopoverController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";

//import popover
import { ShoppingPop } from './shopping-popOver/popover';

//import service
import { ShoppingService } from './../../providers/shopping-service/shopping-service';
import { AuthService } from './../../providers/auth-service/auth-service';
/**
 * Generated class for the MyShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-shopping-list',
  templateUrl: 'my-shopping-list.html',
})
export class MyShoppingListPage {
  shoppingLists:Observable<any[]>;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public shoppingService: ShoppingService,
     public alertCtrl: AlertController,
      public toastCtrl:ToastController,
      public popoverCtrl:PopoverController) {
  }

  ionViewDidLoad() {
    // load our shoppingList only if the user already log in - must be this way for authentication
    this.shoppingService.authState.subscribe(user => {
      if (user) {
        this.shoppingLists = this.shoppingService.getUserList();
      }
      else{
        this.shoppingLists = null;
      }

      });
  }

  // show popover options
  onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create(ShoppingPop);
    popover.present({ev: event});
  }


  
  /************************* SHOPPING List CRUD ********************************/

  // add new list
  newList(){
      let prompt = this.alertCtrl.create({
      title: 'Create new shopping List',
      message: 'Enter a new name for your new list',
      inputs: [
        {
          name: 'name',
          placeholder:'Groceries'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
        },
        {
          text: 'Create List',
          handler: data => { // get the data from the alert ctrl -> the email from input
            this.shoppingService.createNewList(data.name).then(data => {
              this.presentToast('New list created!');

            })
            .catch(err => {
            });

          }
        }
      ]
    })
    prompt.present();
  }



  // removeList
  removeList(id){
    this.shoppingService.removeList(id);
  }
  
  updatelist(listKey,name){
    console.log(listKey);
     let prompt = this.alertCtrl.create({
      title: 'Update shopping List title',
      message: 'Enter a new name for list',
      inputs: [
        {
          name: 'updateName',
          placeholder:'update list name'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
        },
        {
          text: 'Update List title',
          handler: data => { // get the data from the alert ctrl -> the email from input
            this.shoppingService.updateListTitle(listKey,data.updateName).then(data => {
              this.presentToast('New list created!');

            })
            .catch(err => {
            });

          }
        }
      ]
    })
    prompt.present();
    
  }



  
  /********************    items shopping **************/
  
  // add item to list shopping
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

  /************************* SHOPPING items CRUD ********************************/


    
  removeItem(itemId,listId){
    this.shoppingService.removeshoppingItem(listId,itemId).then(()=>{
            this.presentToast('item deleted');

    })

  }

  updateItem(itemId,listId){
     let prompt = this.alertCtrl.create({
      title: 'Update item Name ',
      message: 'Enter a new name for item',
      inputs: [
        {
          name: 'ItemUpdate',
          placeholder:'update item name'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
        },
        {
          text: 'Update item ',
          handler: data => { // get the data from the alert ctrl -> the email from input
            this.shoppingService.updateItem(listId,itemId,data.ItemUpdate).then(data => {
              this.presentToast('item updated');

            })
            .catch(err => {
            });

          }
        }
      ]
    })
    prompt.present();
    

  }


  /*************************  Interaction between users  ********************************/
  shareList(listId, listName){
     let prompt = this.alertCtrl.create({
      title: 'Share your list "' + listName + '"',
      message: 'Enter the email of the person you want to share your list with',
      inputs: [
        {
          name: 'email',
          placeholder:'john@doe.com'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
        },
        {
          text: 'Share List',
          handler: data => { // get the data from the alert ctrl -> the email from input
            this.shoppingService.shareList(listId,listName,data.email).then(data => {
              this.presentToast('Invitation send to ' + data.email);

            })
            .catch(err => {
            });

          }
        }
      ]
    })
    prompt.present();
  }



// helpful method


 // present the toast after create new list
  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }



 



  
  
}
