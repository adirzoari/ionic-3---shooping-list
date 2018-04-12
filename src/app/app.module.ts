import { TestPage } from './../pages/test/test';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import pages
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from './../pages/intro/intro';
import { LoginPage } from './../pages/login/login';
import { SharedListPage } from './../pages/shared-list/shared-list';
import { AcceptListPage } from './../pages/accept-list/accept-list';
import { ProfilePage } from './../pages/profile/profile';
import { MyShoppingListPage } from './../pages/my-shopping-list/my-shopping-list';
import { PhotoShoppingListPage } from './../pages/photo-shopping-list/photo-shopping-list';

// import popOver
import { ShoppingPop } from './../pages/my-shopping-list/shopping-popOver/popover';

// import services
import { AuthService } from './../providers/auth-service/auth-service';
import { ShoppingService } from '../providers/shopping-service/shopping-service';
import { photoShoppingService } from '../providers/photo-shopping-service/photo-shopping-service';

// import angularfire
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';



  var firebaseConfig = {
    apiKey: "AIzaSyAOt1DF0nWWDytiw8Y2Sl_QcrO4sGt9OUk",
    authDomain: "shoppinglist-ionicacademy.firebaseapp.com",
    databaseURL: "https://shoppinglist-ionicacademy.firebaseio.com",
    projectId: "shoppinglist-ionicacademy",
    storageBucket: "shoppinglist-ionicacademy.appspot.com",
    messagingSenderId: "573971324136"
  };

// import cordova plugins && native
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    IntroPage,
    LoginPage,
    SharedListPage,
    AcceptListPage,
    ProfilePage,
    MyShoppingListPage,
    ShoppingPop,
    PhotoShoppingListPage,
    TestPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    IntroPage,
    LoginPage,
    SharedListPage,
    AcceptListPage,
    ProfilePage,
    MyShoppingListPage,
    ShoppingPop,
    PhotoShoppingListPage,
    TestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ShoppingService,
    photoShoppingService,
    Camera
  ]
})
export class AppModule {}
