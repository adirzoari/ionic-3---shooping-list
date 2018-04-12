import { TestPage } from './../pages/test/test';
import { ProfilePage } from './../pages/profile/profile';
import { Component,ViewChild} from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import pages
import { IntroPage } from './../pages/intro/intro';
import { LoginPage } from './../pages/login/login';
import { MyShoppingListPage } from './../pages/my-shopping-list/my-shopping-list';
import { SharedListPage } from './../pages/shared-list/shared-list';

// import provider
import { AuthService } from "../providers/auth-service/auth-service";
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

  rootPage:any = IntroPage;
  pages: Array<{title: string, component: any,icon:string}>;



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private authService:AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pages = [
      { title: 'My Shopping List', component: MyShoppingListPage,icon:"assets/img/library.png" },
      { title: 'Shared List', component: SharedListPage,icon: "assets/img/library.png" },
      { title: 'Shared List', component: SharedListPage,icon: "assets/img/library.png" },
      { title: 'Log out',component:'',icon:"assets/img/library.png"}
   
    ];
      // subscribe to the authstate, if changed navigate to tabsPage,else if user logout goes to loginpage

      authService.authState.subscribe(user => {
        console.log('user changed:' + user);
        if(user){
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      })
    });
  }
  
  navToPage(component:any){
    if(component ==''){
      this.logOut();
    }
    this.nav.push(component);
  }

   // logout user
   logOut(){
    this.authService.logoutUser().then(()=>{
      this.nav.setRoot(LoginPage);
    })
  }
}
