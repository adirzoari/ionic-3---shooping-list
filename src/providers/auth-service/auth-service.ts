import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import angularfire modules
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  authState: Observable <firebase.User>; // check if user change state:  log in\log out
  user: firebase.User;

  constructor(private afAuth: AngularFireAuth,public afd:AngularFireDatabase) {
    this.authState = afAuth.authState;
    this.authState.subscribe(user => {  // if authentication has changed so get the user
      this.user = user;
    });

  }


  /************************* AUTENTHICATION   ********************************/

  signUp(email,password,name){
    /*
      sign up with firebase\angularfire, then get newUser and push\update the uid of the user as a key and email and name.
      e.g:
      keyUid:k1234
      userProfile:
        k1234:
            email: adir1991@gmail.com
            name: adirzoari
    */
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(newUser => {
      this.afd.list('/userProfile').update(newUser.uid,{email:email,name:name});
    })
  }

  // log in user , return the user object
  loginUser(email,password){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }

  // log out user
  logoutUser(){
    return this.afAuth.auth.signOut();
  }

  resetPassword(email){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }


 
// update profile
  getUserData() {
    return this.afd.object('/userProfile/'+this.user.uid);
  }
  
  updateUserName(newName) {
    return this.afd.object('/userProfile/'+this.user.uid).update({name:newName});
  }


}
