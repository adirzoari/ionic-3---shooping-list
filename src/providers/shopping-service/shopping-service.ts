import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import angularfire modules
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


/*
  Generated class for the shoppingServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ShoppingService {

  authState: Observable <firebase.User>; // check if user change state:  log in\log out
  user: firebase.User;

constructor(private afAuth: AngularFireAuth,public afd:AngularFireDatabase) {
    this.authState = afAuth.authState;
    this.authState.subscribe(user => {  // if authentication has changed so get the user
      this.user = user;
    });

  }



  /************************* SHOPPING List CRUD ********************************/

  createNewList(name){
    // push create a unique id for the list
    return this.afd.list('/shoppingLists').push({name:name,creator:this.user.email});
  }
  
  updateListTitle(listKey,name){

  return this.afd.object('/shoppingLists/' + listKey).update({name:name});




  }
  removeList(id) {
    // remove the specific shopping list with the id 
    return this.afd.list('/shoppingLists').remove(id);
  }


  getUserList(){
    /*
      return the shopping list by query:
      only the shopping list where the user email create it
      orderByChild: check the child of the shoppingList equal to the email
    */
    return this.afd.list('/shoppingLists',{
      query: {
        orderByChild:'creator',
        equalTo: this.user.email
      }
    })
    .map(lists =>{ // each list seperate and we iterate about each list and own items
      return lists.map(oneList => {
        oneList.shoppingItems = this.afd.list('/shoppingLists/' + oneList.$key +'/items');
        console.log(oneList);
        return oneList;
      });
    });
    }


    /************************* SHOPPING Items CRUD ********************************/
    // add items to the specific list
    addListItem(listId,item){
      return this.afd.list('/shoppingLists/'+listId +'/items').push({name:item});
    }
    // remove specific item of any list
    removeshoppingItem(listId,itemId){
            return this.afd.list('/shoppingLists/' +listId + '/items').remove(itemId);

    }
    updateItem(listId,itemId,ItemUpdate){
       return this.afd.list('/shoppingLists/' +listId + '/items').update(itemId,{name:ItemUpdate});
       

    }
  






  

  


   /*************************  Interaction between users  ********************************/

  shareList(listId, listName, shareWith){
    return this.afd.list('/invitations').push({listId:listId, listName: listName, toEmail:shareWith, fromEmail: this.user.email});
  }


  getUserInvitations(){ 
     return this.afd.list('/invitations',{
      query: {
        orderByChild:'toEmail', // get all the invitiations other users send to him
        equalTo: this.user.email
      }
    })
  }

 acceptInvitation(invitation){
    this.discardInvitation(invitation.$key);
    let data = {
      [this.user.uid]: true
    }
    return this.afd.object('/shoppingLists/' + invitation.listId).update(data);
  }

  discardInvitation(invitationId){
      this.afd.list('/invitations').remove(invitationId);
  }

    
  getSharedLists(){
    /*
      return the shopping list by query:
      only the shopping list where the user email create it
      orderByChild: check the child of the shoppingList equal to the email

      explanation about this:
      we have 2 clients: A and B. if A share to B and B accept it. then in shared list B see the shared list in his category
    */
    return this.afd.list('/shoppingLists',{
      query: {
        orderByChild: this.user.uid,
        equalTo: true
      }
    })
    .map(lists => { // each list seperate and we iterate about each list and own items
      return lists.map(oneList => {
        oneList.shoppingItems = this.afd.list('/shoppingLists/' + oneList.$key +'/items');
        return oneList;
      });
    });
  }




}
