import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmailValidator } from "../../validators/email";


// import facebook & firebase
import firebase from 'firebase';

// import provider
import { AuthService } from './../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup; // for validator 
  loading:Loading;

  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,public authService: AuthService,
    public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
    this.loginForm = formBuilder.group({
      // we can specifiy each variable with specific validator 
      email: ['',Validators.compose([Validators.required, EmailValidator.isValid])], // validators.requires(from ionic) - required value, EmailValidator(own validator)- isValid the name of our function
      password: ['',Validators.compose([Validators.minLength(6),Validators.required])],// Validators.minLength(6) - minimum 6 letters
    })
  }

ionViewDidLoad() {
  //this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
}

 loginUser(){
    if(this.loginForm.valid){
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password)
      .then((data) => {
        console.log('My data: ',data);
        this.loading.dismiss().then(() => {
         // this.navCtrl.setRoot('TabsPage');
        });
      }, error => {
        this.loading.dismiss().then(() =>{
          let alert = this.alertCtrl.create({
            title: 'Error',
            message:error.message,
            buttons:[
              {
                text: 'Ok',
                role:'cancel'
              }
            ]
           });
           alert.present();
        });
      });
    }
  }

  goToSignup(){
    this.navCtrl.push('RegisterPage');
  }

  resetPassword(){
    let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: 'Enter the email below',
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
          text: 'Reset',
          handler: data => { // get the data from the alert ctrl -> the email from input
            this.authService.resetPassword(data.email).then(data => {
              this.showBasicAlert('Success','Check your email for further instructions.');
            })
            .catch(err => {
                this.showBasicAlert('Error',err.message);     
            });

          }
        }
      ]
    })
    prompt.present();
  }

  showBasicAlert(title,text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
